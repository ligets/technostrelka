package com.srt.Accounts.services;

import com.srt.Accounts.dto.UserInformationDto;
import com.srt.Accounts.models.User;
import com.srt.Accounts.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserInformationDto userInformation() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByLogin(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("user not found from context holder"));
        return UserInformationDto.builder()
                .login(user.getLogin())
                .email(user.getEmail())
                .build();
    }
}
