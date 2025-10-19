package com.nahuelgallardo.budgetgenerator.service.impl;

import com.nahuelgallardo.budgetgenerator.model.Client;
import com.nahuelgallardo.budgetgenerator.repository.ClientRepository;
import com.nahuelgallardo.budgetgenerator.service.IClientService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientServiceImpl implements IClientService {
    private final ClientRepository repository;

    public ClientServiceImpl(ClientRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Client> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Client> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Client save(Client client) {
        return repository.save(client);
    }

    @Override
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Client not found with id " + id);
        }
        repository.deleteById(id);
    }
}
