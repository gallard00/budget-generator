package com.nahuelgallardo.budgetgenerator.service.impl;

import com.nahuelgallardo.budgetgenerator.model.Budget;
import com.nahuelgallardo.budgetgenerator.repository.BudgetRepository;
import com.nahuelgallardo.budgetgenerator.service.IBudgetService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BudgetServiceImpl implements IBudgetService {
    private final BudgetRepository repository;

    public BudgetServiceImpl(BudgetRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Budget> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Budget> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public List<Budget> findByClientId(Long clientId) {
        return repository.findByClientId(clientId);
    }

    @Override
    public Budget save(Budget budget) {
        return repository.save(budget);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
