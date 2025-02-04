package com.srt.Accounts.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(
        info = @Info(
                title = "Accounts API",
                version = "1.0.0",
                description = "Документация REST API моего приложения",
                contact = @Contact(name = "Ваше имя", email = "email@example.com", url = "https://example.com")
        )
)
@Configuration
public class SwaggerConfig {
}
