package com.nahuelgallardo.budgetgenerator.auth.dto.request;

import com.nahuelgallardo.budgetgenerator.auth.model.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private Role role;
}
