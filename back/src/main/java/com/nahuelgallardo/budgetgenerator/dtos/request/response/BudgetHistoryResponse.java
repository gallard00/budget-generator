package com.nahuelgallardo.budgetgenerator.dtos.request.response;

import lombok.Data;

import java.time.LocalDate;

@Data
public class BudgetHistoryResponse {
    private Long id;
    private LocalDate changeDate;
    private String previousData; // el snapshot JSON puro
}
