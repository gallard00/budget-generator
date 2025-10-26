package com.nahuelgallardo.budgetgenerator.auth.service;

import com.nahuelgallardo.budgetgenerator.auth.dto.request.AuthRequest;
import com.nahuelgallardo.budgetgenerator.auth.dto.request.RegisterRequest;
import com.nahuelgallardo.budgetgenerator.auth.dto.response.AuthResponse;

public interface AuthService {
    void register(RegisterRequest request);
    AuthResponse login(AuthRequest request);
}
