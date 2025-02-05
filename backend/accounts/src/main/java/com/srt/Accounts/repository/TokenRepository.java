package com.srt.Accounts.repository;

import com.srt.Accounts.models.Token;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TokenRepository extends JpaRepository<Token, UUID> {

}
