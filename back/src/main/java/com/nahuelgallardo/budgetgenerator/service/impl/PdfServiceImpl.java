package com.nahuelgallardo.budgetgenerator.service.impl;

import com.nahuelgallardo.budgetgenerator.exporter.IFileExporter;
import com.nahuelgallardo.budgetgenerator.model.Budget;
import com.nahuelgallardo.budgetgenerator.repository.BudgetRepository;
import com.nahuelgallardo.budgetgenerator.service.IPdfService;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

@Service
public class PdfServiceImpl implements IPdfService {
    private final BudgetRepository budgetRepository;
    private final IFileExporter pdfExporter;

    public PdfServiceImpl(BudgetRepository budgetRepository, IFileExporter pdfExporter) {
        this.budgetRepository = budgetRepository;
        this.pdfExporter = pdfExporter;
    }

    @Override
    public Resource exportBudgetToPdf(Long budgetId) {
        Budget budget = budgetRepository.findById(budgetId)
                .orElseThrow(() -> new RuntimeException("Budget not found with id " + budgetId));

        if (budget.getClient() == null) {
            throw new RuntimeException("Budget " + budgetId + " has no client associated");
        }

        try {
            File file = pdfExporter.export(budget);
            return new FileSystemResource(file);
        } catch (IOException e) {
            throw new RuntimeException("Error generating PDF: " + e.getMessage(), e);
        }
    }
}
