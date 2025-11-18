package com.nahuelgallardo.budgetgenerator.dtos.request.response;

import lombok.Data;

@Data
public class BudgetItemResponse {
    private Long id;
    private String description;
    private Integer quantity;
    private Double unitPrice;
    private Double subtotal;
}
