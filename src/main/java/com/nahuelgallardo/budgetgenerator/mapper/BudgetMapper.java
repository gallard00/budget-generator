package com.nahuelgallardo.budgetgenerator.mapper;

import com.nahuelgallardo.budgetgenerator.dtos.request.request.BudgetRequest;
import com.nahuelgallardo.budgetgenerator.dtos.request.response.BudgetResponse;
import com.nahuelgallardo.budgetgenerator.model.Budget;
import com.nahuelgallardo.budgetgenerator.model.BudgetItem;
import com.nahuelgallardo.budgetgenerator.model.Client;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class BudgetMapper {
    private final BudgetItemMapper itemMapper;

    public BudgetMapper(BudgetItemMapper itemMapper) {
        this.itemMapper = itemMapper;
    }

    public Budget toEntity(BudgetRequest request, Client client) {
        if (request == null) return null;
        Budget budget = Budget.builder()
                .date(request.getDate())
                .client(client)
                .build();

        if (request.getItems() != null) {
            List<BudgetItem> items = request.getItems().stream()
                    .map(itemMapper::toEntity)
                    .peek(item -> item.setBudget(budget))
                    .collect(Collectors.toList());
            budget.setItems(items);
        }

        return budget;
    }

    public BudgetResponse toResponse(Budget entity) {
        if (entity == null) return null;
        BudgetResponse response = new BudgetResponse();
        response.setId(entity.getId());
        response.setDate(entity.getDate());
        response.setTotal(entity.getTotal());
        response.setClientName(entity.getClient() != null ? entity.getClient().getName() : null);

        if (entity.getItems() != null) {
            response.setItems(entity.getItems().stream()
                    .map(itemMapper::toResponse)
                    .collect(Collectors.toList()));
        }

        return response;
    }
}
