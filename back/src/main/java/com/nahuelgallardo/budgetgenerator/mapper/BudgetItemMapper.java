package com.nahuelgallardo.budgetgenerator.mapper;

import com.nahuelgallardo.budgetgenerator.dtos.request.request.BudgetItemRequest;
import com.nahuelgallardo.budgetgenerator.dtos.request.response.BudgetItemResponse;
import com.nahuelgallardo.budgetgenerator.model.BudgetItem;
import org.springframework.stereotype.Component;

@Component
public class BudgetItemMapper {

    public BudgetItem toEntity(BudgetItemRequest request) {
        if (request == null) return null;
        return BudgetItem.builder()
                .description(request.getDescription())
                .quantity(request.getQuantity())
                .unitPrice(request.getUnitPrice())
                .build();
    }

    public BudgetItemResponse toResponse(BudgetItem entity) {
        if (entity == null) return null;
        BudgetItemResponse response = new BudgetItemResponse();
        response.setId(entity.getId());
        response.setDescription(entity.getDescription());
        response.setQuantity(entity.getQuantity());
        response.setUnitPrice(entity.getUnitPrice());
        if (entity.getQuantity() != null && entity.getUnitPrice() != null)
            response.setSubtotal(entity.getQuantity() * entity.getUnitPrice());
        return response;
    }
}
