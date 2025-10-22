package com.nahuelgallardo.budgetgenerator.strategy;

import com.nahuelgallardo.budgetgenerator.model.CalculationInput;
import com.nahuelgallardo.budgetgenerator.model.CalculationResult;

public interface ICalculationStrategy {
    CalculationResult calculate(CalculationInput input);
}
