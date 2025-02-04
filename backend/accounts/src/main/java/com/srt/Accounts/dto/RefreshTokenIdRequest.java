package com.srt.Accounts.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class RefreshTokenIdRequest {
    private UUID refreshTokenId;
}
