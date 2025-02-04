package com.srt.Accounts.services;

import com.srt.Accounts.models.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {
    private PrivateKey privateKey;
    private PublicKey publicKey;

    @Value("${auth.token.private-key-path}")
    private String privateKeyPath;

    @Value("${auth.token.public-key-path}")
    private String publicKeyPath;

    @Value("${auth.token.access-expire-min}")
    private int accessTokenExpireMin;

    @Value("${auth.token.refresh-expire-days}")
    private int refreshTokenExpireDays;

    @PostConstruct
    public void init() {
        privateKey = loadPrivateKey();
        publicKey = loadPublicKey();
    }

    public String generateAccessToken(User user) {
        return generateToken(user,
                new Date(System.currentTimeMillis()),
                new Date(System.currentTimeMillis() + (1000L * 60 * accessTokenExpireMin))
        );
    }

    public String generateRefreshToken(User user) {
        return generateToken(user,
                new Date(System.currentTimeMillis()),
                new Date(System.currentTimeMillis() + (1000L * 60 * 60 * 24 * refreshTokenExpireDays))
        );
    }

    private String generateToken(User user, Date iat, Date exp) {
        Map<String, String> claims = new HashMap<>();
        claims.put("id", user.getId().toString());
        claims.put("email", user.getEmail());
        claims.put("roles", user.getRoles().iterator().next().name());

        return Jwts.builder()
                .claims(claims)
                .subject(user.getLogin())
                .issuedAt(iat)
                .expiration(exp)
                .signWith(privateKey, Jwts.SIG.RS256)
                .compact();
    }

    public String extractSubject(String token) {
        return extractClaims(token).getSubject();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        try {
            final String username = extractSubject(token);
            return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isTokenExpired(String token) {
        Date expirationDate = extractClaims(token).getExpiration();
        return expirationDate.before(new Date());
    }

    private Claims extractClaims(String token) {
        return Jwts.parser()
                .verifyWith(publicKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private PrivateKey loadPrivateKey() {
        try {
            InputStream inputStream = new ClassPathResource(privateKeyPath).getInputStream();
            byte[] keyBytes = inputStream.readAllBytes();
            String privateKeyPEM = new String(keyBytes)
                    .replace("-----BEGIN PRIVATE KEY-----", "")
                    .replace("-----END PRIVATE KEY-----", "")
                    .replaceAll("\\s", "");
            byte[] decoded = Base64.getDecoder().decode(privateKeyPEM);
            PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(decoded);
            KeyFactory kf = KeyFactory.getInstance("RSA");
            return kf.generatePrivate(spec);
        } catch (Exception e) {
            throw new RuntimeException("Ошибка загрузки .pem файла (private key)", e);
        }
    }

    private PublicKey loadPublicKey() {
        try {
            InputStream inputStream = new ClassPathResource(publicKeyPath).getInputStream();
            byte[] keyBytes = inputStream.readAllBytes();
            String publicKeyPEM = new String(keyBytes)
                    .replace("-----BEGIN PUBLIC KEY-----", "")
                    .replace("-----END PUBLIC KEY-----", "")
                    .replaceAll("\\s", "");
            byte[] decoded = Base64.getDecoder().decode(publicKeyPEM);
            X509EncodedKeySpec spec = new X509EncodedKeySpec(decoded);
            KeyFactory kf = KeyFactory.getInstance("RSA");
            return kf.generatePublic(spec);
        } catch (Exception e) {
            throw new RuntimeException("Ошибка загрузки .pem файла (public key)", e);
        }
    }
}
