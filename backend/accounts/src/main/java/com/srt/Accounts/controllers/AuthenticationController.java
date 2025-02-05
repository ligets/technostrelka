package com.srt.Accounts.controllers;

import com.srt.Accounts.dto.*;
import com.srt.Accounts.services.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Аутентификация")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @Operation(summary = "Регистрация пользователя")
    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@Valid @RequestBody SignUpRequest request) {
        authenticationService.signUp(request);
        return ResponseEntity.ok("пользователь зарегистрирован");
    }


    @Operation(summary = "Авторизация пользователя")
    @PostMapping("/signin")
    public ResponseEntity<JwtAuthenticationDto> signIn(
            @Valid @RequestBody SignInRequest request) {
        return ResponseEntity.ok(authenticationService.signIn(request));
    }

    @Operation(summary = "Получаене нового access токена")
    @PostMapping("/refresh-token")
    public ResponseEntity<AccessTokenDto> refreshToken(
            @RequestBody RefreshTokenIdRequest request) {
        return ResponseEntity.ok(authenticationService.getTokens(request.getRefreshTokenId()));
    }

    @Operation(summary = "Проверка аутентификации (доступ только аутентифицированным пользователям)")
    @GetMapping("/is-auth")
    public ResponseEntity<String> isAuth() {
        return ResponseEntity.ok("hello user");
    }
}
