package com.nahuelgallardo.budgetgenerator.dtos.request.response;

import lombok.Data;

@Data
public class ClientResponse {
    private Long id;
    private String name;
    private String phone;
    private String address;
}
