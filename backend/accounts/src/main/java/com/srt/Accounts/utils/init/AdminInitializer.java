package com.srt.Accounts.utils.init;

import com.srt.Accounts.models.Role;
import com.srt.Accounts.models.User;
import com.srt.Accounts.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;

@Component
@RequiredArgsConstructor
public class AdminInitializer implements CommandLineRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        String login = "admin";
        String password = "admin";
        String email = "admin@ad.min";

        if (userRepository.findByLogin(login).isEmpty()) {
            User admin = User.builder()
                    .login(login)
                    .password(passwordEncoder.encode(password))
                    .email(email)
                    .roles(new HashSet<>(List.of(Role.ROLE_ADMIN)))
                    .build();
            userRepository.save(admin);
        }
    }
}
