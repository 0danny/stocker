package com.danny.backend.test;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.danny.backend.models.BaseResponse;

@RestController
@RequestMapping("/api/v1/demo-controller")
public class DemoController {

    @GetMapping
    public ResponseEntity<BaseResponse<String>> demoController() {
        return ResponseEntity.ok(new BaseResponse<>(true, "Hello from secured endpoint.", null));
    }

    @GetMapping("/subscribed")
    @PreAuthorize("hasAuthority('USER_SUBSCRIBED')")
    public String subscriptionTest() {
        return "You are subscribed.";
    }

}
