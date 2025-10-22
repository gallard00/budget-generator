package com.nahuelgallardo.budgetgenerator.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CalculationResult {
    private double squareMeters;
    private double totalPrice;
}
