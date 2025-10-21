package com.nahuelgallardo.budgetgenerator.dtos.request.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class BudgetResponse {
    private Long id;
    private LocalDate date;
    private Double total;
    private String client;
    private List<BudgetItemResponse> items;
}
