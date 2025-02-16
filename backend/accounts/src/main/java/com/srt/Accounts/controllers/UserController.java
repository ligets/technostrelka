package com.srt.Accounts.controllers;

import com.srt.Accounts.dto.UserInformationDto;
import com.srt.Accounts.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Tag(name = "Личный кабинет")
public class UserController {
    private final UserService userService;

    @Operation(summary = "Получение информации о пользователе")
    @GetMapping("/get-user")
    public UserInformationDto getUserInformation() {
        return userService.userInformation();
    }

    @Operation(summary = "Загрузка аватарки")
    @PostMapping("/upload-avatar")
    public void uploadAvatar(@RequestParam("avatar") MultipartFile avatar) {
        userService.uploadAvatar(avatar);
    }

    @Operation(summary = "Получение аватарки по id пользователя (доступ без авторизации)")
    @GetMapping("/get-avatar/{userId}")
    public byte[] getAvatarById(@PathVariable UUID userId) {
        return userService.getAvatar(userId);
    }
}
