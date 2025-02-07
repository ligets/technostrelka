package com.srt.Accounts.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
@Tag(name = "Админ панель")
public class AdminController {

    @Operation(summary = "Проверка авторизации (доступ только админам)")
    @GetMapping("is-admin")
    public String isAdmin() {
        return "hello admin";
    }
}
