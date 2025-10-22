package com.nahuelgallardo.budgetgenerator.service;

import com.nahuelgallardo.budgetgenerator.model.CalculationInput;
import com.nahuelgallardo.budgetgenerator.model.CalculationResult;

public interface ICalculationService {
    CalculationResult calculate(CalculationInput input);
}
