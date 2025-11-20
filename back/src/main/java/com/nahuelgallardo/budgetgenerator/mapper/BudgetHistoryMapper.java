package com.nahuelgallardo.budgetgenerator.mapper;

import com.nahuelgallardo.budgetgenerator.dtos.request.response.BudgetHistoryResponse;
import com.nahuelgallardo.budgetgenerator.model.BudgetHistory;
import org.springframework.stereotype.Component;

@Component
public class BudgetHistoryMapper {
    public BudgetHistoryResponse toResponse(BudgetHistory entity) {
        BudgetHistoryResponse res = new BudgetHistoryResponse();
        res.setId(entity.getId());
        res.setChangeDate(entity.getChangeDate());
        res.setPreviousData(entity.getPreviousData());
        return res;
    }
}
