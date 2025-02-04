package com.srt.Accounts.services;

import com.srt.Accounts.auth.UserDetailsImpl;
import com.srt.Accounts.models.User;
import com.srt.Accounts.repository.AuthRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    private final AuthRepository authRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = authRepository.findByLogin(username)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "пользователь с логином " + username + " не найден"
                ));
        return new UserDetailsImpl(user);
    }
}
