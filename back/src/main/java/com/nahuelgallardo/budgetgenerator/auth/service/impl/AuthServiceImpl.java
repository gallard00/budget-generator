package com.nahuelgallardo.budgetgenerator.auth.service.impl;

import com.nahuelgallardo.budgetgenerator.auth.dto.request.AuthRequest;
import com.nahuelgallardo.budgetgenerator.auth.dto.request.RegisterRequest;
import com.nahuelgallardo.budgetgenerator.auth.dto.response.AuthResponse;
import com.nahuelgallardo.budgetgenerator.auth.model.Role;
import com.nahuelgallardo.budgetgenerator.auth.model.User;
import com.nahuelgallardo.budgetgenerator.auth.repository.UserRepository;
import com.nahuelgallardo.budgetgenerator.auth.security.jwt.JwtUtil;
import com.nahuelgallardo.budgetgenerator.auth.security.user.CustomUserDetails;
import com.nahuelgallardo.budgetgenerator.auth.service.AuthService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder,
                           AuthenticationManager authenticationManager,
                           JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public void register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        // Rol por defecto
        Role assignedRole = Role.ROLE_USER;

        // Si viene un rol por JSON, validamos
        if (request.getRole() != null) {

            // Seguridad: evitar registrar admins accidentalmente
            if (request.getRole().equalsIgnoreCase("ROLE_ADMIN")) {
                throw new RuntimeException("Forbidden: cannot self-register as ADMIN");
            }

            // Aceptamos solo roles válidos existentes
            try {
                assignedRole = Role.valueOf(request.getRole());
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Invalid role: " + request.getRole());
            }
        }

        User u = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(assignedRole)
                .build();

        userRepository.save(u);
    }


    @Override
    public AuthResponse login(AuthRequest request) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();

        // Claims personalizados
        Map<String, Object> claims = new HashMap<>();

        // ⬅️ AGREGAR ESTO: las authorities que Spring Security necesita
        claims.put("authorities",
                userDetails.getAuthorities()
                        .stream()
                        .map(a -> a.getAuthority())
                        .toList()
        );

        // Opcional: dejar tu field "role" si querés
        claims.put("role", userDetails.getUser().getRole().name());

        // Generar token con roles incluidos
        String token = jwtUtil.generateToken(claims, userDetails);

        return new AuthResponse(token);
    }

}
