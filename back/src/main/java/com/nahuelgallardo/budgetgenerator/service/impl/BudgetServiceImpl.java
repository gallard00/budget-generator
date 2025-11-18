package com.nahuelgallardo.budgetgenerator.service.impl;

import com.nahuelgallardo.budgetgenerator.dtos.request.request.BudgetRequest;
import com.nahuelgallardo.budgetgenerator.dtos.request.response.BudgetResponse;
import com.nahuelgallardo.budgetgenerator.mapper.BudgetItemMapper;
import com.nahuelgallardo.budgetgenerator.mapper.BudgetMapper;
import com.nahuelgallardo.budgetgenerator.model.Budget;
import com.nahuelgallardo.budgetgenerator.model.Client;
import com.nahuelgallardo.budgetgenerator.repository.BudgetRepository;
import com.nahuelgallardo.budgetgenerator.repository.ClientRepository;
import com.nahuelgallardo.budgetgenerator.service.IBudgetService;
import com.nahuelgallardo.budgetgenerator.service.IBudgetHistoryService;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BudgetServiceImpl implements IBudgetService {
    private final BudgetRepository budgetRepository;
    private final ClientRepository clientRepository;
    private final IBudgetHistoryService historyService;
    private final BudgetMapper mapper;
    private final BudgetItemMapper itemMapper;

    public BudgetServiceImpl(BudgetRepository budgetRepository, ClientRepository clientRepository, BudgetMapper mapper, IBudgetHistoryService historyService, BudgetItemMapper itemMapper) {
        this.budgetRepository = budgetRepository;
        this.clientRepository = clientRepository;
        this.mapper = mapper;
        this.historyService = historyService;
        this.itemMapper = itemMapper;
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

        double total = budget.getItems().stream()
                .mapToDouble(item -> item.getQuantity() * item.getUnitPrice())
                .sum();

        budget.setTotal(total);

        Budget saved = budgetRepository.save(budget);
        return mapper.toResponse(saved);
    }

    @Override
    public BudgetResponse update(Long id, BudgetRequest request) {
        Budget existing = budgetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Budget not found with id " + id));

        Client client = clientRepository.findById(request.getClientId())
                .orElseThrow(() -> new RuntimeException("Client not found with id " + request.getClientId()));

        // Crear registro histórico antes de actualizar
        historyService.recordSnapshot(existing);
        // Actualizar datos
        existing.setDate(request.getDate());
        existing.setClient(client);

        existing.getItems().clear();
        var updatedItems = Optional.ofNullable(request.getItems())
                .map(items -> items.stream()
                        .map(itemMapper::toEntity)
                        .peek(item -> item.setBudget(existing))
                        .toList())
                .orElse(List.of());

        existing.getItems().addAll(updatedItems);

        double total = existing.getItems().stream()
                .mapToDouble(item -> item.getQuantity() * item.getUnitPrice())
                .sum();
        existing.setTotal(total);

        Budget updated = budgetRepository.save(existing);
        return mapper.toResponse(updated);
    }

    @Override
    public void delete(Long id) {
        budgetRepository.deleteById(id);
    }
}
