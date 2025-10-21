package com.nahuelgallardo.budgetgenerator.controller;

import com.nahuelgallardo.budgetgenerator.service.IPdfService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/export/pdf")
public class PdfExporterController {
    private final IPdfService pdfService;

    public PdfExporterController(IPdfService pdfService) {
        this.pdfService = pdfService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resource> exportBudgetToPdf(@PathVariable Long id) {
        Resource pdf = pdfService.exportBudgetToPdf(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=budget_" + id + ".pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }
}
