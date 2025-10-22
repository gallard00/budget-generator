package com.nahuelgallardo.budgetgenerator.strategy.impl;

import com.nahuelgallardo.budgetgenerator.model.CalculationInput;
import com.nahuelgallardo.budgetgenerator.model.CalculationResult;
import com.nahuelgallardo.budgetgenerator.strategy.ICalculationStrategy;
import org.springframework.stereotype.Component;

@Component("marmol")
public class MarmolCalculation implements ICalculationStrategy {
    private static final double PRICE_PER_M2 = 18000;

    @Override
    public CalculationResult calculate(CalculationInput input) {
        double area = input.getWidth() * input.getHeight();
        double total = area * PRICE_PER_M2;
        return new CalculationResult(area, total);
    }
}
