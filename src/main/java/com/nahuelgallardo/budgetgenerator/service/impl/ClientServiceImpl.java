package com.nahuelgallardo.budgetgenerator.service.impl;

import com.nahuelgallardo.budgetgenerator.dtos.request.request.ClientRequest;
import com.nahuelgallardo.budgetgenerator.dtos.request.response.ClientResponse;
import com.nahuelgallardo.budgetgenerator.mapper.ClientMapper;
import com.nahuelgallardo.budgetgenerator.model.Client;
import com.nahuelgallardo.budgetgenerator.repository.ClientRepository;
import com.nahuelgallardo.budgetgenerator.service.IClientService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClientServiceImpl implements IClientService {
    private final ClientRepository repository;
    private final ClientMapper mapper;

    public ClientServiceImpl(ClientRepository repository, ClientMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public List<ClientResponse> findAll() {
        return repository.findAll().stream()
                .map(mapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<ClientResponse> findById(Long id) {
        return repository.findById(id)
                .map(mapper::toResponse);
    }

    @Override
    public ClientResponse save(ClientRequest request) {
        Client client = mapper.toEntity(request);
        Client saved = repository.save(client);
        return mapper.toResponse(saved);
    }

    @Override
    public ClientResponse update(Long id, ClientRequest request) {
        Client existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client not found with id " + id));

        existing.setName(request.getName());
        existing.setPhone(request.getPhone());
        existing.setAddress(request.getAddress());

        Client updated = repository.save(existing);
        return mapper.toResponse(updated);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
