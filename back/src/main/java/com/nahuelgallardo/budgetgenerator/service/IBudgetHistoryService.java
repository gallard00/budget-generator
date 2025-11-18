package com.nahuelgallardo.budgetgenerator.service;

import com.nahuelgallardo.budgetgenerator.model.Budget;
import com.nahuelgallardo.budgetgenerator.model.BudgetHistory;

import java.util.List;

public interface IBudgetHistoryService {
    List<BudgetHistory> findByBudgetId(Long budgetId);

    BudgetHistory recordSnapshot(Budget budget);
}

