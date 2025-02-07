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
    public void signUp(@Valid @RequestBody SignUpRequest request) {
        authenticationService.signUp(request);
    }

    @Operation(summary = "Авторизация пользователя")
    @PostMapping("/signin")
    public JwtAuthenticationDto signIn(@Valid @RequestBody SignInRequest request) {
        return authenticationService.signIn(request);
    }

    @Operation(summary = "Получаене нового access токена")
    @PostMapping("/refresh-token")
    public JwtAuthenticationDto refreshToken(
            @Valid @RequestBody RefreshTokenIdRequest request) {
        return authenticationService.getTokens(request.getRefreshTokenId());
    }

    @Operation(summary = "Проверка аутентификации (доступ только аутентифицированным пользователям)")
    @GetMapping("/is-auth")
    public String isAuth() {
        return "hello user";
    }
}
