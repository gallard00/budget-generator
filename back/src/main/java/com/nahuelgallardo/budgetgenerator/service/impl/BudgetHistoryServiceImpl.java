package com.nahuelgallardo.budgetgenerator.service.impl;

import com.google.gson.Gson;
import com.nahuelgallardo.budgetgenerator.model.Budget;
import com.nahuelgallardo.budgetgenerator.model.BudgetHistory;
import com.nahuelgallardo.budgetgenerator.repository.BudgetHistoryRepository;
import com.nahuelgallardo.budgetgenerator.service.IBudgetHistoryService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BudgetHistoryServiceImpl implements IBudgetHistoryService {

    private final BudgetHistoryRepository historyRepository;
    private final Gson gson;

    public BudgetHistoryServiceImpl(BudgetHistoryRepository historyRepository) {
        this.historyRepository = historyRepository;
        this.gson = new Gson();
    }

    @Override
    public List<BudgetHistory> findByBudgetId(Long budgetId) {
        return historyRepository.findByBudgetId(budgetId);
    }

    @Override
    public BudgetHistory recordSnapshot(Budget budget) {
        BudgetHistory history = BudgetHistory.builder()
                .changeDate(LocalDate.now())
                .previousData(gson.toJson(budget))
                .budget(budget)
                .build();

        return historyRepository.save(history);
    }
}

