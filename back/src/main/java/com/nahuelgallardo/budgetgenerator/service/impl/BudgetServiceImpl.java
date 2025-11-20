package com.nahuelgallardo.budgetgenerator.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.nahuelgallardo.budgetgenerator.dtos.request.request.BudgetItemRequest;
import com.nahuelgallardo.budgetgenerator.dtos.request.request.BudgetRequest;
import com.nahuelgallardo.budgetgenerator.dtos.request.response.BudgetResponse;
import com.nahuelgallardo.budgetgenerator.mapper.BudgetItemMapper;
import com.nahuelgallardo.budgetgenerator.mapper.BudgetMapper;
import com.nahuelgallardo.budgetgenerator.model.Budget;
import com.nahuelgallardo.budgetgenerator.model.BudgetHistory;
import com.nahuelgallardo.budgetgenerator.model.Client;
import com.nahuelgallardo.budgetgenerator.model.snapshot.BudgetItemSnapshot;
import com.nahuelgallardo.budgetgenerator.model.snapshot.BudgetSnapshot;
import com.nahuelgallardo.budgetgenerator.repository.BudgetHistoryRepository;
import com.nahuelgallardo.budgetgenerator.repository.BudgetRepository;
import com.nahuelgallardo.budgetgenerator.repository.ClientRepository;
import com.nahuelgallardo.budgetgenerator.service.IBudgetService;
import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BudgetServiceImpl implements IBudgetService {
    private final BudgetRepository budgetRepository;
    private final ClientRepository clientRepository;
    private final BudgetHistoryRepository historyRepo;
    private final BudgetItemMapper itemMapper;
    private final BudgetMapper mapper;

    public BudgetServiceImpl(BudgetRepository budgetRepository, ClientRepository clientRepository, BudgetItemMapper itemMapper, BudgetHistoryRepository historyRepo, BudgetMapper mapper) {
        this.budgetRepository = budgetRepository;
        this.clientRepository = clientRepository;
        this.historyRepo = historyRepo;
        this.itemMapper = itemMapper;
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

        Budget budget = new Budget();
        budget.setClient(client);
        budget.setDate(request.getDate());

        // Cargar items
        budget.getItems().clear();

        if (request.getItems() != null && !request.getItems().isEmpty()) {
            request.getItems().forEach(itemReq -> {
                var item = itemMapper.toEntity(itemReq);
                item.setBudget(budget);
                budget.getItems().add(item);
            });
        }

        // Calcular total
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

        // SERIALIZAR SOLO SNAPSHOT, NO EL BUDGET
        ObjectMapper jsonMapper = new ObjectMapper();
        jsonMapper.registerModule(new JavaTimeModule());
        jsonMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        String previousJson;
        try {
            BudgetSnapshot snapshot = toSnapshot(existing); // Asegurar que sea la clase correcta
            previousJson = jsonMapper.writeValueAsString(snapshot);
        } catch (Exception e) {
            throw new RuntimeException("Error creating snapshot", e);
        }

        BudgetHistory history = BudgetHistory.builder()
                .changeDate(LocalDate.now())
                .previousData(previousJson)
                .budget(existing)
                .build();

        existing.getHistories().add(history);

        // Update core fields
        existing.setDate(request.getDate());
        existing.setClient(client);

        existing.getItems().clear();

        if (request.getItems() != null) {
            for (BudgetItemRequest itemReq : request.getItems()) {
                var item = itemMapper.toEntity(itemReq);
                item.setBudget(existing);
                existing.getItems().add(item);
            }
        }

        double total = existing.getItems().stream()
                .mapToDouble(i -> i.getQuantity() * i.getUnitPrice())
                .sum();

        existing.setTotal(total);

        Budget updated = budgetRepository.save(existing);
        return mapper.toResponse(updated);
    }





    @Override
    public void delete(Long id) {
        budgetRepository.deleteById(id);
    }

    private BudgetSnapshot toSnapshot(Budget b) {
        BudgetSnapshot snap = new BudgetSnapshot();
        snap.setId(b.getId());
        snap.setDate(b.getDate());
        snap.setTotal(b.getTotal());
        snap.setClientId(b.getClient().getId());

        snap.setItems(
                b.getItems()
                        .stream()
                        .map(i -> {
                            BudgetItemSnapshot si = new BudgetItemSnapshot();
                            si.setDescription(i.getDescription());
                            si.setUnitPrice(i.getUnitPrice());
                            si.setQuantity(i.getQuantity());
                            return si;
                        })
                        .toList()
        );

        return snap;
    }


}
