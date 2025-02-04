package com.srt.Accounts.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Schema(description = "Запрос на аутентификацию")
public class SignInRequest {
    @Schema(description = "логин", example = "Alex123")
    @NotBlank
    private String login;
    @Schema(description = "пароль", example = "123123123")
    @NotBlank
    private String password;
}
