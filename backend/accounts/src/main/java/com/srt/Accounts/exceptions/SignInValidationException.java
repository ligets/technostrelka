package com.srt.Accounts.exceptions;

public class SignInValidationException extends RuntimeException {
    public SignInValidationException(String message) {
        super(message);
    }
}
