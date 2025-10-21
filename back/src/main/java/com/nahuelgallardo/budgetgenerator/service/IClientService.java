package com.nahuelgallardo.budgetgenerator.service;

import com.nahuelgallardo.budgetgenerator.dtos.request.request.ClientRequest;
import com.nahuelgallardo.budgetgenerator.dtos.request.response.ClientResponse;
import com.nahuelgallardo.budgetgenerator.model.Client;

import java.util.List;
import java.util.Optional;

public interface IClientService {
    List<ClientResponse> findAll();
    Optional<ClientResponse> findById(Long id);
    ClientResponse save(ClientRequest request);
    ClientResponse update(Long id, ClientRequest request);
    void delete(Long id);
}
