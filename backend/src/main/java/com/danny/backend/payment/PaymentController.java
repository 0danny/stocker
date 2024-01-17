package com.danny.backend.payment;

import java.util.Collections;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stripe.Stripe;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.StripeObject;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.stripe.param.checkout.SessionCreateParams;

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

    @PostConstruct
    public void init() {
        Stripe.apiKey = env.getProperty("STRIPE_TOKEN");
        endpointSecret = env.getProperty("STRIPE_WEBHOOK_SECRET");
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

            logger.info("Webhook received: " + event.getType());

            EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();
            StripeObject stripeObject = null;

            if (dataObjectDeserializer.getObject().isPresent()) {
                stripeObject = dataObjectDeserializer.getObject().get();

                switch (event.getType()) {
                    case "checkout.session.completed":

                        Session session = (Session) stripeObject;

                        logger.info("Customer Email: " + session.getCustomerEmail());

                        Optional<User> currentUser = userRepository.findByEmail(session.getCustomerEmail());

                        if (currentUser.isPresent()) {
                            currentUser.get().setAuthorities(
                                    Collections.singletonList(new SimpleGrantedAuthority("USER_SUBSCRIBED")));

                            userRepository.save(currentUser.get());

                            logger.info("User role updated to premium.");
                        } else {
                            logger.info("User not found.");
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

    @GetMapping("/createCheckout")
    public ResponseEntity<BaseResponse<String>> createCheckoutSession() {

        Optional<User> currentUser = authService.getCurrentUser();

        if (currentUser.isPresent()) {
            SessionCreateParams params = SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.SUBSCRIPTION)
                    .setSuccessUrl("http://localhost:3000/success")
                    .setCancelUrl("http://localhost:3000/cancel")
                    .setCustomerEmail(currentUser.get().getEmail())
                    .addLineItem(
                            SessionCreateParams.LineItem.builder()
                                    .setQuantity(1L)
                                    .setPrice("price_1OVqjAEVFaFOMcghAhqjUroa")
                                    .build())
                    .build();

            Session session;
            try {
                session = Session.create(params);
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
