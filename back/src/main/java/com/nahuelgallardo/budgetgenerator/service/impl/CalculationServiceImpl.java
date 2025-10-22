package com.nahuelgallardo.budgetgenerator.service.impl;

import com.nahuelgallardo.budgetgenerator.model.CalculationInput;
import com.nahuelgallardo.budgetgenerator.model.CalculationResult;
import com.nahuelgallardo.budgetgenerator.service.ICalculationService;
import com.nahuelgallardo.budgetgenerator.strategy.ICalculationStrategy;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class CalculationServiceImpl implements ICalculationService {
    private final Map<String, ICalculationStrategy> strategies;

    @Override
    public CalculationResult calculate(CalculationInput input) {
        String key = input.getMaterialType().name().toLowerCase();
        ICalculationStrategy strategy = strategies.get(key);

        if (strategy == null) {
            throw new RuntimeException("No calculation strategy found for material: " + input.getMaterialType());
        }

        return strategy.calculate(input);
    }
}
