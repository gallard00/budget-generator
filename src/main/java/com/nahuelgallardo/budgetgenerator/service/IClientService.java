package com.nahuelgallardo.budgetgenerator.service;

import com.nahuelgallardo.budgetgenerator.model.Client;

import java.util.List;
import java.util.Optional;

public interface IClientService {
    List<Client> findAll();
    Optional<Client> findById(Long id);
    Client save(Client client);
    void delete(Long id);
}
