package com.danny.backend.test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.danny.backend.auth.AuthService;
import com.danny.backend.models.BaseResponse;

@RestController
@RequestMapping("/api/v1/demo-controller")
public class DemoController {

    @Autowired
    private AuthService authService;

    @GetMapping
    public ResponseEntity<BaseResponse<String>> demoController() {
        return ResponseEntity.ok(new BaseResponse<>(true, "Hello from secured endpoint.", null));
    }

    @GetMapping("/subscribed")
    @PreAuthorize("hasAuthority('200')")
    public String subscriptionTest() {
        return "You are subscribed.";
    }

}
