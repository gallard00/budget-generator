package com.nahuelgallardo.budgetgenerator.dtos.request.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BudgetItemResponse {
    private Long id;
    private String description;
    private Integer quantity;
    private Double unitPrice;
    private Double subtotal;
}
