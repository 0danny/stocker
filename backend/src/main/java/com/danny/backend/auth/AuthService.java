package com.danny.backend.auth;

import java.util.Optional;
import java.util.concurrent.TimeUnit;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.danny.backend.config.JwtService;
import com.danny.backend.models.BaseResponse;
import com.danny.backend.models.Role;
import com.danny.backend.models.User;
import com.danny.backend.repository.UserRepository;

import jakarta.servlet.http.Cookie;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;

    public Optional<User> getCurrentUser() {
        // Get the user object.
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        User userObject = null;

        if (principal instanceof User) {
            userObject = (User) principal;
        }

        return Optional.ofNullable(userObject);
    }

    public Cookie generateCookie(String jwtToken) {
        Cookie jwtCookie = new Cookie("jwtToken", jwtToken);
        jwtCookie.setHttpOnly(true);
        jwtCookie.setMaxAge((int) TimeUnit.MINUTES.toSeconds(jwtService.tokenExpirationMs / 60000));
        jwtCookie.setPath("/");

        return jwtCookie;
    }

    public Cookie generateRevoke() {
        Cookie revokedCookie = new Cookie("jwtToken", "");
        revokedCookie.setHttpOnly(true);
        revokedCookie.setMaxAge(0);
        revokedCookie.setPath("/");

        return revokedCookie;
    }

    public BaseResponse<String> register(RegisterRequest request) {

        // Could combine these two into a single query if we wanted to, probably would
        // be more preformant.

        // Ensure the username doesn't already exist.
        if (repository.existsByUsername(request.getUsername())) {
            return new BaseResponse<String>(false, "Username already exists.", null);
        }

        // Ensure the email doesn't already exist.
        if (repository.existsByEmail(request.getEmail())) {
            return new BaseResponse<String>(false, "Email already exists.", null);
        }

        var user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        repository.save(user);

        var jwtToken = jwtService.generateToken(user);

        return new BaseResponse<String>(true, "Registered.", jwtToken);
    }

    public BaseResponse<String> authenticate(AuthRequest request) {

        BaseResponse<String> resp;

        try {
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

            var user = repository.findByUsername(request.getUsername());

            // This is kind of pointless but good security measure to have in.
            if (user.isPresent()) {
                var jwtToken = jwtService.generateToken(user.get());

                resp = new BaseResponse<String>(true, "Authenticated.", jwtToken);
            } else {
                resp = new BaseResponse<String>(false, "User does not exist.", null);
            }

        } catch (DisabledException disabledEx) {
            resp = new BaseResponse<String>(false, "Account is disabled.", null);
        } catch (LockedException lockedEx) {
            resp = new BaseResponse<String>(false, "Account is locked.", null);
        } catch (BadCredentialsException badCredsEx) {
            resp = new BaseResponse<String>(false, "Username or password is incorrect.", null);
        }

        return resp;
    }

}
