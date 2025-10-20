package com.nahuelgallardo.budgetgenerator.service;

import com.nahuelgallardo.budgetgenerator.dtos.request.request.BudgetItemRequest;
import com.nahuelgallardo.budgetgenerator.dtos.request.response.BudgetItemResponse;

import java.util.List;

public interface IBudgetItemService {
    List<BudgetItemResponse> findAll();
    BudgetItemResponse save(BudgetItemRequest request);
}
