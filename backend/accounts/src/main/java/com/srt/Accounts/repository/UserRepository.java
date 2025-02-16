package com.srt.Accounts.repository;

import com.srt.Accounts.models.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    boolean existsByLogin(String login);
    boolean existsByEmail(String email);
    Optional<User> findByLogin(String login);

    @Modifying
    @Transactional
    @Query("update User u set u.pathToAvatar = :pathToAvatar where u.login = :login")
    void setPathToAvatarByLogin(@Param("pathToAvatar") String pathToAvatar, @Param("login") String login);
}
