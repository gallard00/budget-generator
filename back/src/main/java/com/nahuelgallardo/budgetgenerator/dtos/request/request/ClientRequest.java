package com.nahuelgallardo.budgetgenerator.dtos.request.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClientRequest {
    private String name;
    private String phone;
    private String address;
}
