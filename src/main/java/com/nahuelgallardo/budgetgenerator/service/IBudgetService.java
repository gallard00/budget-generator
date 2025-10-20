package com.nahuelgallardo.budgetgenerator.service;

import com.nahuelgallardo.budgetgenerator.dtos.request.request.BudgetRequest;
import com.nahuelgallardo.budgetgenerator.dtos.request.response.BudgetResponse;
import com.nahuelgallardo.budgetgenerator.model.Budget;

import java.util.List;
import java.util.Optional;

public interface IBudgetService {
    List<BudgetResponse> findAll();
    Optional<BudgetResponse> findById(Long id);
    List<BudgetResponse> findByClientId(Long clientId);
    BudgetResponse save(BudgetRequest request);
    BudgetResponse update(Long id, BudgetRequest request);
    void delete(Long id);
}
