package com.nahuelgallardo.budgetgenerator.dtos.request.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClientResponse {
    private Long id;
    private String name;
    private String phone;
    private String address;
}
