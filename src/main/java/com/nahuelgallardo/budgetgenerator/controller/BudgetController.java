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

    // 🔹 Obtener todos los presupuestos
    @GetMapping
    public List<Budget> getAll() {
        return service.findAll();
    }

    // 🔹 Obtener un presupuesto por ID
    @GetMapping("/{id}")
    public ResponseEntity<Budget> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 🔹 Obtener todos los presupuestos de un cliente específico
    @GetMapping("/client/{clientId}")
    public List<Budget> getByClientId(@PathVariable Long clientId) {
        return service.findByClientId(clientId);
    }

    // 🔹 Crear un presupuesto
    @PostMapping
    public ResponseEntity<Budget> create(@RequestBody Budget budget) {
        Budget created = service.save(budget);
        return ResponseEntity.ok(created);
    }

    // 🔹 Actualizar un presupuesto existente
    @PutMapping("/{id}")
    public ResponseEntity<Budget> update(@PathVariable Long id, @RequestBody Budget updatedBudget) {
        return service.findById(id)
                .map(existing -> {
                    updatedBudget.setId(existing.getId());
                    Budget saved = service.save(updatedBudget);
                    return ResponseEntity.ok(saved);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // 🔹 Eliminar un presupuesto
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
