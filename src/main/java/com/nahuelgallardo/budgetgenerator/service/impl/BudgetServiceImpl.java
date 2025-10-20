package com.nahuelgallardo.budgetgenerator.service.impl;

import com.nahuelgallardo.budgetgenerator.dtos.request.request.BudgetRequest;
import com.nahuelgallardo.budgetgenerator.dtos.request.response.BudgetResponse;
import com.nahuelgallardo.budgetgenerator.mapper.BudgetMapper;
import com.nahuelgallardo.budgetgenerator.model.Budget;
import com.nahuelgallardo.budgetgenerator.model.Client;
import com.nahuelgallardo.budgetgenerator.repository.BudgetRepository;
import com.nahuelgallardo.budgetgenerator.repository.ClientRepository;
import com.nahuelgallardo.budgetgenerator.service.IBudgetService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BudgetServiceImpl implements IBudgetService {
    private final BudgetRepository budgetRepository;
    private final ClientRepository clientRepository;
    private final BudgetMapper mapper;

    public BudgetServiceImpl(BudgetRepository budgetRepository, ClientRepository clientRepository, BudgetMapper mapper) {
        this.budgetRepository = budgetRepository;
        this.clientRepository = clientRepository;
        this.mapper = mapper;
    }

    @Override
    public List<BudgetResponse> findAll() {
        return budgetRepository.findAll().stream()
                .map(mapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<BudgetResponse> findById(Long id) {
        return budgetRepository.findById(id)
                .map(mapper::toResponse);
    }

    @Override
    public List<BudgetResponse> findByClientId(Long clientId) {
        return budgetRepository.findByClientId(clientId).stream()
                .map(mapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public BudgetResponse save(BudgetRequest request) {
        Client client = clientRepository.findById(request.getClientId())
                .orElseThrow(() -> new RuntimeException("Client not found with id " + request.getClientId()));

        Budget budget = mapper.toEntity(request, client);
        Budget saved = budgetRepository.save(budget);
        return mapper.toResponse(saved);
    }

    @Override
    public BudgetResponse update(Long id, BudgetRequest request) {
        Budget existing = budgetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Budget not found with id " + id));

        Client client = clientRepository.findById(request.getClientId())
                .orElseThrow(() -> new RuntimeException("Client not found with id " + request.getClientId()));

        existing.setDate(request.getDate());
        existing.setTotal(request.getTotal());
        existing.setClient(client);

        existing.getItems().clear();
        if (request.getItems() != null) {
            request.getItems().forEach(itemReq -> {
                var item = mapper.toEntity(request, client).getItems().get(0);
                item.setBudget(existing);
                existing.getItems().add(item);
            });
        }

        Budget updated = budgetRepository.save(existing);
        return mapper.toResponse(updated);
    }

    @Override
    public void delete(Long id) {
        budgetRepository.deleteById(id);
    }
}
