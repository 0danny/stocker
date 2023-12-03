package com.danny.backend.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.danny.backend.config.JwtService;
import com.danny.backend.models.BaseResponse;
import com.danny.backend.models.Role;
import com.danny.backend.models.User;
import com.danny.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;

    public BaseResponse<String> register(RegisterRequest request) {

        // Ensure the username doesn't already exist.

        if (repository.existsByUsername(request.getUsername())) {
            return new BaseResponse<String>(false, "Username already exists.", null);
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
