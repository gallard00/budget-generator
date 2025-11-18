package com.nahuelgallardo.budgetgenerator.model.snapshot;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class BudgetSnapshot {
    private Long id;
    private LocalDate date;
    private Double total;
    private Long clientId;
    private List<BudgetItemSnapshot> items;
}
