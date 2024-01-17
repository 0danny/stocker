package com.danny.backend.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.danny.backend.models.BaseResponse;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService service;

    @PostMapping("/register")
    public ResponseEntity<BaseResponse<String>> register(@Valid @RequestBody RegisterRequest request,
            BindingResult result, HttpServletResponse response) {

        if (result.hasErrors()) {
            return ResponseEntity.ok(new BaseResponse<String>(false, "Validation error.", null));
        }

        BaseResponse<String> registrationResponse = service.register(request);

        if (registrationResponse.getStatus() == true) {
            String jwtToken = registrationResponse.getPayload();

            Cookie jwtCookie = service.generateCookie(jwtToken);
            response.addCookie(jwtCookie);
        }

        return ResponseEntity.ok(registrationResponse);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<BaseResponse<String>> authenticate(@Valid @RequestBody AuthRequest request,
            BindingResult result, HttpServletResponse response) {

        if (result.hasErrors()) {
            return ResponseEntity.ok(new BaseResponse<String>(false, "Validation error.", null));
        }

        BaseResponse<String> authenticationResponse = service.authenticate(request);

        if (authenticationResponse.getStatus() == true) {
            String jwtToken = authenticationResponse.getPayload();

            Cookie jwtCookie = service.generateCookie(jwtToken);
            response.addCookie(jwtCookie);
        }

        return ResponseEntity.ok(authenticationResponse);
    }

    @GetMapping("/logout")
    public ResponseEntity<BaseResponse<String>> revoke(HttpServletRequest request, HttpServletResponse response) {
        Cookie jwtCookie = service.generateRevoke();
        response.addCookie(jwtCookie);

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }

        return ResponseEntity.ok(new BaseResponse<String>(true, "Revoked token.", null));
    }

}
