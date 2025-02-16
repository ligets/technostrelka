package com.srt.Accounts.services;

import com.srt.Accounts.dto.UserInformationDto;
import com.srt.Accounts.models.User;
import com.srt.Accounts.repository.UserRepository;
import com.srt.Accounts.utils.AuthenticationUtil;
import com.srt.Accounts.utils.RandomStringUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    @Value("${images.storage-path}")
    private String storagePathName;

    @Value("${images.default-avatar-path}")
    private String defaultAvatarPath;

    public UserInformationDto userInformation() {
        UserDetails userDetails = AuthenticationUtil.getUserDetails();
        User user = userRepository.findByLogin(userDetails.getUsername())
                .orElseThrow(RuntimeException::new);
        return UserInformationDto.builder()
                .login(user.getLogin())
                .email(user.getEmail())
                .build();
    }

    @Transactional
    public void uploadAvatar(MultipartFile avatar) {
        String avatarPathName = storagePathName + "/" +
                RandomStringUtil.getRandomString(50) +
                '_' + AuthenticationUtil.getUserDetails().getUsername() +
                avatar.getName().lastIndexOf(".");
        File file = new File(avatarPathName);
        try {
            avatar.transferTo(file);
        } catch (IOException e) {
            throw new RuntimeException("file transfer error " + e);
        }

        User user = userRepository
                .findByLogin(AuthenticationUtil.getUserDetails().getUsername())
                .orElseThrow(RuntimeException::new);

        if (user.getPathToAvatar() != null) {
            removeAvatarFromStorage(user.getPathToAvatar());
        }

        user.setPathToAvatar(avatarPathName);
    }

    public byte[] getAvatar(UUID id) {
        String avatarPathName = userRepository
                .findById(id)
                .orElseThrow(RuntimeException::new)
                .getPathToAvatar();

        if (avatarPathName != null) {
            try {
                return Files.readAllBytes(Paths.get(avatarPathName));
            } catch (IOException e) {
                throw new RuntimeException("file read error" + e);
            }
        }
        return defaultAvatar();
    }

    private byte[] defaultAvatar() {
        try (InputStream is = getClass()
                .getClassLoader().getResourceAsStream(defaultAvatarPath)) {
            if (is == null) {
                throw new RuntimeException("file not found");
            }
            return is.readAllBytes();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private void removeAvatarFromStorage(String pathToAvatar) {
        File file = new File(pathToAvatar);
        if (!file.delete()) {
            throw new RuntimeException("file deletion error");
        }
    }
}
