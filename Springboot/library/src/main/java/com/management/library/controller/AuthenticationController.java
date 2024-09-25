package com.management.library.controller;

import com.management.library.dto.JwtAuthenticationResponse;
import com.management.library.dto.RefreshTokenRequest;
import com.management.library.dto.SignInRequest;
import com.management.library.dto.SignUpRequest;
import com.management.library.entity.User;
import com.management.library.exception.BadRequestServiceAlertException;
import com.management.library.service.AuthenticationService;
import com.management.library.service.JWTServiceImpl;;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private JWTServiceImpl jwtService;

    @PostMapping("/visitors-signup")
    public User VisitorSignUp(@RequestBody SignUpRequest signUpRequest) {
        return authenticationService.VisitorSignUp(signUpRequest);
    }

    @PostMapping("/admin-signup")
    public User AdminSignUp(@RequestBody SignUpRequest signUpRequest) {
        return authenticationService.AdminSignUp(signUpRequest);
    }

    @PostMapping("/Librarian-signup")
    public User superAdminSignUp(@RequestBody SignUpRequest signUpRequest) {
        return authenticationService.LibrarianSignUp(signUpRequest);
    }

    @PostMapping("/login")
    public JwtAuthenticationResponse login(@Valid @RequestBody SignInRequest signInRequest) {
        return authenticationService.signIn(signInRequest);
    }

    @PostMapping("/refresh")
    public JwtAuthenticationResponse refresh(@RequestBody RefreshTokenRequest referceTokenRequest) {
        return authenticationService.refreshToken(referceTokenRequest);
    }

    @PostMapping("/signout")
    public ResponseEntity<?> logoutUser() {

        SecurityContextHolder.clearContext();

        ResponseCookie cookie = jwtService.getCleanJwtCookie();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new BadRequestServiceAlertException(200,"You've been signed out!"));
    }

}