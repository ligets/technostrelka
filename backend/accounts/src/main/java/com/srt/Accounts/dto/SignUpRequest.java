package com.srt.Accounts.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Schema(description = "Запрос на регистрацию")
public class SignUpRequest {
    @Schema(description = "логин", example = "Alex123")
    @NotBlank
    private String login;

    @Schema(description = "почта", example = "alex123@gmail.com")
    @NotBlank
    @Email
    private String email;

    @Schema(description = "пароль", example = "123123123")
    @NotBlank
    private String password;

    @Schema(description = "подтверждение пароля", example = "123123123")
    @NotBlank
    private String confirmPassword;
}
