package com.nahuelgallardo.budgetgenerator.model.snapshot;

import lombok.Data;

@Data
public class BudgetItemSnapshot {
    private String description;
    private Double unitPrice;
    private Integer quantity;
}
