package com.nahuelgallardo.budgetgenerator.service;
import org.springframework.core.io.Resource;

public interface IPdfService {
    Resource exportBudgetToPdf(Long budgetId);
}
