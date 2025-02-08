package com.srt.Accounts.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserInformationDto {
    private String login;
    private String email;
}
