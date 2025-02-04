package com.srt.Accounts.exceptions;

import lombok.Getter;

import java.util.List;

@Getter
public class SignUpValidationException extends RuntimeException {
    private final List<String> errors;

    public SignUpValidationException(String message, List<String> errors) {
        super(message);
        this.errors = errors;
    }
}
