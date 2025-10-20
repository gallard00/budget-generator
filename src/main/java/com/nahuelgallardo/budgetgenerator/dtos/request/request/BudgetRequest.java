package com.nahuelgallardo.budgetgenerator.dtos.request.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class BudgetRequest {
    private LocalDate date;
    private Double total;
    private Long clientId;
    private List<BudgetItemRequest> items;
}
