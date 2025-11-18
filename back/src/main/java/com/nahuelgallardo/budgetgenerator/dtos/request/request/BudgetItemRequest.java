package com.nahuelgallardo.budgetgenerator.dtos.request.request;

import lombok.Data;

@Data
public class BudgetItemRequest {
    private String description;
    private Integer quantity;
    private Double unitPrice;
}
