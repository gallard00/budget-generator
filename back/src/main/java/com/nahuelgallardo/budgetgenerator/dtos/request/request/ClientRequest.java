package com.nahuelgallardo.budgetgenerator.dtos.request.request;

import lombok.Data;

@Data
public class ClientRequest {
    private String name;
    private String phone;
    private String address;
}
