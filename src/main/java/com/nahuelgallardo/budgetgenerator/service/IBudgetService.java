package com.nahuelgallardo.budgetgenerator.service;

import com.nahuelgallardo.budgetgenerator.model.Budget;

import java.util.List;
import java.util.Optional;

public interface IBudgetService {
    List<Budget> findAll();
    Optional<Budget> findById(Long id);
    List<Budget> findByClientId(Long clientId);
    Budget save(Budget budget);
    void delete(Long id);
}
