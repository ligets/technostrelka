package com.srt.Accounts.services;

import com.srt.Accounts.dto.AccessTokenDto;
import com.srt.Accounts.dto.JwtAuthenticationDto;
import com.srt.Accounts.dto.SignInRequest;
import com.srt.Accounts.dto.SignUpRequest;
import com.srt.Accounts.exceptions.RefreshTokenExpiredException;
import com.srt.Accounts.exceptions.RefreshTokenNotFoundException;
import com.srt.Accounts.exceptions.SignUpValidationException;
import com.srt.Accounts.models.Role;
import com.srt.Accounts.models.Token;
import com.srt.Accounts.models.User;
import com.srt.Accounts.repository.AuthRepository;
import com.srt.Accounts.repository.TokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final AuthRepository authRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public void signUp(SignUpRequest request) {
        // catch from controller advice
        validation(request);

        User user = User.builder()
                .login(request.getLogin())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(new HashSet<>(List.of(Role.ROLE_USER)))
                .build();

        authRepository.save(user);
    }

    public JwtAuthenticationDto signIn(SignInRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getLogin(),
                request.getPassword()
        ));
        User user = authRepository.findByLogin(request.getLogin())
                .orElseThrow(RuntimeException::new);

        Token token = Token.builder()
                .token(jwtService.generateRefreshToken(user))
                .user(user)
                .build();
        tokenRepository.save(token);

        return new JwtAuthenticationDto(
                jwtService.generateAccessToken(user),
                token.getId()
        );
    }

    public JwtAuthenticationDto getTokens(UUID refreshTokenId) {
        Token token = tokenRepository.findById(refreshTokenId)
                .orElseThrow(() -> new RefreshTokenNotFoundException("токен не найден"));

        if (jwtService.isTokenExpired(token.getToken())) {
            tokenRepository.delete(token);
            throw new RefreshTokenExpiredException("время действия токена истекло");
        }

        Token newToken = Token.builder()
                .token(jwtService.generateRefreshToken(token.getUser()))
                .user(token.getUser())
                .build();
        tokenRepository.delete(token);
        tokenRepository.save(newToken);

        return new JwtAuthenticationDto(
                jwtService.generateAccessToken(token.getUser()),
                newToken.getId()
        );
    }

    private void validation(SignUpRequest request) {
        List<String> errors = new ArrayList<>();
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            errors.add("пароли не совпадают");
        }
        if (authRepository.existsByLogin(request.getLogin())) {
            errors.add("этот логин уже занят");
        }
        if (authRepository.existsByEmail(request.getEmail())) {
            errors.add("эта почта уже занята");
        }

        if (!errors.isEmpty()) {
            throw new SignUpValidationException("ошибка валидации", errors);
        }
    }
}
