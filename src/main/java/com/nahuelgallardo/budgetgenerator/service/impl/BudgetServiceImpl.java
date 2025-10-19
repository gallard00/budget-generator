package com.nahuelgallardo.budgetgenerator.service.impl;

import com.nahuelgallardo.budgetgenerator.model.Budget;
import com.nahuelgallardo.budgetgenerator.model.Client;
import com.nahuelgallardo.budgetgenerator.repository.BudgetRepository;
import com.nahuelgallardo.budgetgenerator.repository.ClientRepository;
import com.nahuelgallardo.budgetgenerator.service.IBudgetService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BudgetServiceImpl implements IBudgetService {
    private final BudgetRepository budgetRepository;
    private final ClientRepository clientRepository;

    public BudgetServiceImpl(BudgetRepository budgetRepository, ClientRepository clientRepository) {
        this.budgetRepository = budgetRepository;
        this.clientRepository = clientRepository;
    }

    @Override
    public List<Budget> findAll() {
        return budgetRepository.findAll();
    }

    @Override
    public Optional<Budget> findById(Long id) {
        return budgetRepository.findById(id);
    }

    @Override
    public List<Budget> findByClientId(Long clientId) {
        return budgetRepository.findByClientId(clientId);
    }

    @Override
    public Budget save(Budget budget) {
        // Si el cliente viene solo con el id, lo cargamos desde la BD
        if (budget.getClient() != null && budget.getClient().getId() != null) {
            Client client = clientRepository.findById(budget.getClient().getId())
                    .orElseThrow(() -> new RuntimeException("Client not found with id " + budget.getClient().getId()));
            budget.setClient(client);
        }

        return budgetRepository.save(budget);
    }

    @Override
    public void delete(Long id) {
        if (!budgetRepository.existsById(id)) {
            throw new RuntimeException("Budget not found with id " + id);
        }
        budgetRepository.deleteById(id);
    }
}
