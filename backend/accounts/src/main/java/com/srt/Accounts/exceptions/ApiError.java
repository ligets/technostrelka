package com.srt.Accounts.exceptions;

import lombok.Getter;

import java.util.List;

@Getter
public class ApiError {
    private String message;
    private List<String> errors;

    public ApiError(String message, List<String> errors) {
        this.message = message;
        this.errors = errors;
    }
}
