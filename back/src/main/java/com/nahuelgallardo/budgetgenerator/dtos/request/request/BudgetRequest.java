package com.nahuelgallardo.budgetgenerator.dtos.request.request;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class BudgetRequest {
    private LocalDate date;
    private Long clientId;
    private List<BudgetItemRequest> items;
}
