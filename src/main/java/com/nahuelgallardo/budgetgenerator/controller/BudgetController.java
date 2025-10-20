package com.nahuelgallardo.budgetgenerator.controller;


import com.nahuelgallardo.budgetgenerator.dtos.request.request.BudgetRequest;
import com.nahuelgallardo.budgetgenerator.dtos.request.response.BudgetResponse;
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
    public List<BudgetResponse> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<BudgetResponse> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/client/{clientId}")
    public List<BudgetResponse> getByClientId(@PathVariable Long clientId) {
        return service.findByClientId(clientId);
    }

    @PostMapping
    public ResponseEntity<BudgetResponse> create(@RequestBody BudgetRequest request) {
        return ResponseEntity.ok(service.save(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BudgetResponse> update(@PathVariable Long id, @RequestBody BudgetRequest request) {
        return ResponseEntity.ok(service.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
