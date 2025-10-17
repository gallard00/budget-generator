package com.nahuelgallardo.budgetgenerator.controller;

import com.nahuelgallardo.budgetgenerator.model.Budget;
import com.nahuelgallardo.budgetgenerator.service.IBudgetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budgets")
public class BudgetController {
    private final IBudgetService service;

    public BudgetController(IBudgetService service) {
        this.service = service;
    }

    @GetMapping
    public List<Budget> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Budget> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/client/{clientId}")
    public List<Budget> getByClientId(@PathVariable Long clientId) {
        return service.findByClientId(clientId);
    }

    @PostMapping
    public Budget create(@RequestBody Budget budget) {
        return service.save(budget);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Budget> update(@PathVariable Long id, @RequestBody Budget budget) {
        return service.findById(id)
                .map(existing -> {
                    budget.setId(existing.getId());
                    return ResponseEntity.ok(service.save(budget));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
