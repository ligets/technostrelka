package com.srt.Accounts.exceptions.handlers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.util.Map;

@RestControllerAdvice
public class UserExceptionsHandler {

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<Map<String, String>> maxUploadSizeExceededExceptionHandler(
            MaxUploadSizeExceededException e) {
        return ResponseEntity.badRequest().body(
                Map.of("message", "превышен лимит размера изображения (1мб)")
        );
    }
}
