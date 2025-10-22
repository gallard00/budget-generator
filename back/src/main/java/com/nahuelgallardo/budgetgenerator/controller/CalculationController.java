package com.nahuelgallardo.budgetgenerator.controller;

import com.nahuelgallardo.budgetgenerator.model.CalculationInput;
import com.nahuelgallardo.budgetgenerator.model.CalculationResult;
import com.nahuelgallardo.budgetgenerator.service.ICalculationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/calc")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class CalculationController {
    private final ICalculationService calculationService;

    @PostMapping
    public CalculationResult calculate(@RequestBody CalculationInput input) {
        return calculationService.calculate(input);
    }
}
