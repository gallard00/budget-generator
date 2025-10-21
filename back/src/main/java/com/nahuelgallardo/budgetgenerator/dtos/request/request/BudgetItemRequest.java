package com.nahuelgallardo.budgetgenerator.dtos.request.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BudgetItemRequest {
    private String description;
    private Integer quantity;
    private Double unitPrice;
}
