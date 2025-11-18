package com.nahuelgallardo.budgetgenerator.dtos.request.response;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class BudgetResponse {
    private Long id;
    private LocalDate date;
    private Double total;
    private String client;
    private List<BudgetItemResponse> items;
}
