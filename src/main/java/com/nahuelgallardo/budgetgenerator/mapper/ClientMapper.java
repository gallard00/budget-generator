package com.nahuelgallardo.budgetgenerator.mapper;

import com.nahuelgallardo.budgetgenerator.dtos.request.request.ClientRequest;
import com.nahuelgallardo.budgetgenerator.dtos.request.response.ClientResponse;
import com.nahuelgallardo.budgetgenerator.model.Client;
import org.springframework.stereotype.Component;

@Component
public class ClientMapper {

    public Client toEntity(ClientRequest request) {
        if (request == null) return null;
        return Client.builder()
                .name(request.getName())
                .phone(request.getPhone())
                .address(request.getAddress())
                .build();
    }

    public ClientResponse toResponse(Client entity) {
        if (entity == null) return null;
        ClientResponse response = new ClientResponse();
        response.setName(entity.getName());
        response.setPhone(entity.getPhone());
        response.setAddress(entity.getAddress());
        return response;
    }

}
