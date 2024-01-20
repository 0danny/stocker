package com.danny.backend.payment;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Dictionary;
import java.util.Hashtable;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stripe.Stripe;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.param.checkout.SessionCreateParams.LineItem;
import com.stripe.model.Product;
import com.stripe.model.ProductCollection;
import com.stripe.model.StripeObject;
import com.stripe.model.Subscription;
import com.stripe.net.Webhook;

import jakarta.annotation.PostConstruct;

import com.danny.backend.auth.AuthService;
import com.danny.backend.models.BaseResponse;
import com.danny.backend.models.User;
import com.danny.backend.repository.UserRepository;

@RestController
@RequestMapping("/api/v1/payment")
public class PaymentController {

    @Autowired
    private Environment env;

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    private final Logger logger = LoggerFactory.getLogger(PaymentController.class);
    private String endpointSecret;
    private ProductCollection productCollection;
    private Dictionary<Integer, LineItem> lineItems = new Hashtable<>();

    @PostConstruct
    public void init() throws StripeException {
        Stripe.apiKey = env.getProperty("STRIPE_TOKEN");
        endpointSecret = env.getProperty("STRIPE_WEBHOOK_SECRET");

        // Retrieve the product catalog from Stripe
        productCollection = Product.list(Collections.emptyMap());

        // Create a list of line items for the checkout session
        for (Product product : productCollection.getData()) {

            // Make a dictionary of <int, LineItem> where int is the product id
            lineItems.put(Integer.parseInt(product.getMetadata().get("id")),
                    LineItem.builder()
                            .setQuantity(1L)
                            .setPrice(product.getDefaultPrice())
                            .build());
        }
    }

    @PostMapping("/webhook")
    public ResponseEntity<BaseResponse<String>> stripeWebhook(
            @RequestBody String payload,
            @RequestHeader("Stripe-Signature") String sigHeader) {

        Event event;

        // Ensure that the webhook message came from Stripe.
        if (endpointSecret != null && sigHeader != null) {

            // Only verify the event if you have an endpoint secret defined.
            try {
                event = Webhook.constructEvent(payload, sigHeader, endpointSecret);

            } catch (SignatureVerificationException e) {
                logger.info("Invalid signature for webhook: " + e.getMessage());

                // Invalid signature
                return ResponseEntity
                        .ok(new BaseResponse<String>(false, "Webhook signature verification failed.", null));
            }

            // logger.info("Webhook received: " + event.getType());

            EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();
            StripeObject stripeObject = null;

            if (dataObjectDeserializer.getObject().isPresent()) {
                stripeObject = dataObjectDeserializer.getObject().get();

                switch (event.getType()) {
                    case "customer.subscription.deleted":

                        Subscription deletedSession = (Subscription) stripeObject;

                        Optional<User> deleteUser = userRepository
                                .findByCustomerID(deletedSession.getCustomer());

                        if (deleteUser.isPresent()) {
                            // Remove all authorities.
                            deleteUser.get().setAuthorities(null);

                            userRepository.save(deleteUser.get());
                        }

                        break;

                    case "checkout.session.completed":

                        com.stripe.model.checkout.Session completeSession = (com.stripe.model.checkout.Session) stripeObject;

                        Optional<User> checkoutUser = userRepository.findByEmail(completeSession.getCustomerEmail());

                        if (checkoutUser.isPresent()) {
                            // Figure out what they just purchased.
                            Integer productID = Integer.parseInt(completeSession.getMetadata().get("id"));

                            // Set authority to product ID.
                            checkoutUser.get().setAuthorities(new ArrayList<SimpleGrantedAuthority>() {
                                {
                                    add(new SimpleGrantedAuthority(productID.toString()));
                                }
                            });

                            // Stitch customer id into object
                            checkoutUser
                                    .get().setCustomerID(completeSession.getCustomer());

                            userRepository.save(checkoutUser.get());
                        }

                        break;
                }
            } else {
                logger.info("Deserialization failed for webhook.");

                return ResponseEntity
                        .ok(new BaseResponse<String>(false, "Webhook deserialization failed.", null));
            }

            return ResponseEntity.ok(new BaseResponse<String>(true, "Webhook received.", event.getType()));

        } else {
            logger.info("Server error 6:29");

            return ResponseEntity
                    .ok(new BaseResponse<String>(false, "Internal Server Error", null));
        }
    }

    @GetMapping("/createPortal")
    public ResponseEntity<BaseResponse<String>> createBillingPortalSession() {

        Optional<User> currentUser = authService.getCurrentUser();

        if (currentUser.isPresent()) {

            com.stripe.param.billingportal.SessionCreateParams params = com.stripe.param.billingportal.SessionCreateParams
                    .builder()
                    .setCustomer(currentUser.get().getCustomerID())
                    .setReturnUrl("http://localhost:3000/app")
                    .build();

            try {
                com.stripe.model.billingportal.Session session = com.stripe.model.billingportal.Session.create(params);

                return ResponseEntity.ok(new BaseResponse<String>(true, "Session created.", session.getUrl()));

            } catch (StripeException e) {
                logger.error(e.getMessage());

                return ResponseEntity.ok(new BaseResponse<String>(false, "Session creation failed.", null));
            }

        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse<>(false, "Error with user token.", null));
        }
    }

    @PostMapping("/createCheckout")
    public ResponseEntity<BaseResponse<String>> createCheckoutSession(@RequestBody CheckoutRequest request) {

        LineItem currentItem = lineItems.get(request.getId());

        if (currentItem == null) {
            return ResponseEntity.ok(new BaseResponse<String>(false, "Invalid product id.", null));
        }

        Optional<User> currentUser = authService.getCurrentUser();

        if (currentUser.isPresent()) {

            com.stripe.param.checkout.SessionCreateParams params = com.stripe.param.checkout.SessionCreateParams
                    .builder()
                    .setMode(com.stripe.param.checkout.SessionCreateParams.Mode.SUBSCRIPTION)
                    .setSuccessUrl("http://localhost:3000/success")
                    .setCancelUrl("http://localhost:3000/cancel")
                    .setCustomerEmail(currentUser.get().getEmail())
                    .addLineItem(currentItem)
                    .putMetadata("id", request.getId().toString())
                    .build();

            com.stripe.model.checkout.Session session;
            try {
                session = com.stripe.model.checkout.Session.create(params);
            } catch (StripeException e) {
                logger.error(e.getMessage());

                return ResponseEntity.ok(new BaseResponse<String>(false, "Session creation failed.", null));
            }

            return ResponseEntity.ok(new BaseResponse<String>(true, "Session created.", session.getUrl()));

        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse<>(false, "Error with user token.", null));
        }
    }
}
