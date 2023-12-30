package com.danny.backend.user;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.danny.backend.models.BaseResponse;
import com.danny.backend.models.User;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    // GET request that returns User object.
    @GetMapping("/me")
    public ResponseEntity<BaseResponse<User>> getUser() {
        // Get the current user from security context.

        User details = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return ResponseEntity.ok(new BaseResponse<User>(true, "User found", details));
    }
}
