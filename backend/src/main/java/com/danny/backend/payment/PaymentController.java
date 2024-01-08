package com.danny.backend.payment;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

import jakarta.annotation.PostConstruct;

import com.danny.backend.auth.AuthService;
import com.danny.backend.models.BaseResponse;
import com.danny.backend.models.User;

@RestController
@RequestMapping("/api/v1/payment")
public class PaymentController {

    @Autowired
    private Environment env;

    @Autowired
    private AuthService authService;

    private static final Logger logger = LoggerFactory.getLogger(PaymentController.class);

    @PostConstruct
    public void init() {
        Stripe.apiKey = env.getProperty("STRIPE_TOKEN");

        logger.info("Stripe Token Set: " + Stripe.apiKey);
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
