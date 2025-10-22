package com.nahuelgallardo.budgetgenerator.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CalculationInput {
    private double width;
    private double height;
    private MaterialType materialType;
}
