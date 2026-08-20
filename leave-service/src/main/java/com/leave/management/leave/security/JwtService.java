package com.leave.management.leave.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

    private final SecretKey secretKey;

    public JwtService(
            @Value("${jwt.secret}") String secret) {

        this.secretKey = Keys.hmacShaKeyFor(
                secret.getBytes(StandardCharsets.UTF_8)
        );
    }

    public String extractEmail(String token) {

        return extractAllClaims(token)
                .getSubject();
    }

    public String extractRole(String token) {

        return extractAllClaims(token)
                .get("role", String.class);
    }

    public boolean isTokenValid(String token) {

        try {

            Claims claims = extractAllClaims(token);

            System.out.println("========================================");
            System.out.println("JWT VALIDATION");
            System.out.println("JWT Subject: "
                    + claims.getSubject());

            System.out.println("JWT Role: "
                    + claims.get("role", String.class));

            System.out.println("JWT Expiration: "
                    + claims.getExpiration());

            System.out.println("JWT Current Time: "
                    + new Date());

            boolean valid = claims.getExpiration()
                    .after(new Date());

            System.out.println("JWT Valid: " + valid);
            System.out.println("========================================");

            return valid;

        } catch (Exception exception) {

            System.out.println("========================================");
            System.out.println("JWT VALIDATION FAILED");
            System.out.println("Exception: "
                    + exception.getClass().getName());

            System.out.println("Message: "
                    + exception.getMessage());

            System.out.println("========================================");

            return false;
        }
    }

    private Claims extractAllClaims(String token) {

        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}