package com.srt.Accounts.controllers;

import com.srt.Accounts.dto.UserInformationDto;
import com.srt.Accounts.services.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Tag(name = "Личный кабинет")
public class UserController {
    private final UserService userService;

    @GetMapping("/get-user")
    public UserInformationDto getUserInformation() {
        return userService.userInformation();
    }


}
