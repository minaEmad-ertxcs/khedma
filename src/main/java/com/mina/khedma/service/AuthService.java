package com.mina.khedma.service;

import com.mina.khedma.DAO.UserDAO;
import com.mina.khedma.model.AuthResponse;
import com.mina.khedma.model.UserRequest;
import com.mina.khedma.model.enums.Role;
import com.mina.khedma.repo.UserRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import static com.mina.khedma.utilities.GeneralUtils.*;

@Service
public class AuthService {

    private final JWTService jwtService;

    private final AuthenticationManager authManager;

    private final UserRepo userRepo;

    private final TokenService tokenService;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public AuthService(JWTService jwtService, AuthenticationManager authManager, UserRepo userRepo, TokenService tokenService) {
        this.jwtService = jwtService;
        this.authManager = authManager;
        this.userRepo = userRepo;
        this.tokenService = tokenService;
    }

    public ResponseEntity<?> register(UserRequest userRequest) {
        UserDAO existUserDAO = userRepo.findByUsername(userRequest.getUsername());

        if (existUserDAO != null) {
            AuthResponse authResponse = AuthResponse.builder()
                    .message("Username already exists")
                    .build();
            return response(BR_STATUS, authResponse);
        }

        UserDAO userDAO = UserDAO.builder()
                .username(userRequest.getUsername())
                .password(encoder.encode(userRequest.getPassword()))
                .role(Role.USER)
                .build();

        userDAO = userRepo.save(userDAO);

        if (userDAO.getId() != null) {
            return ok(HttpStatus.CREATED, "User registered successfully");
        } else {
            return error(ISE_STATUS, "Failed to register user");
        }
    }

    public ResponseEntity<?> login(UserRequest userRequest) {
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(userRequest.getUsername(), userRequest.getPassword()));
        if (authentication.isAuthenticated()) {

            var user = userRepo.findByUsername(userRequest.getUsername());

            String token = jwtService.generateToken(userRequest.getUsername());
            String refreshToken = jwtService.generateRefreshToken(userRequest.getUsername());

            tokenService.revokeAllUserTokens(user);
            tokenService.saveUserToken(user, token);

            AuthResponse authResponse = AuthResponse.builder()
                    .accessToken(token)
                    .refreshToken(refreshToken)
                    .message("Logged in successfully")
                    .build();

            return response(OK_STATUS, authResponse);
        } else {
            throw new BadCredentialsException("Invalid username and password");
        }
    }
}