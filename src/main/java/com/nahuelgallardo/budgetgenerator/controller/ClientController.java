package com.nahuelgallardo.budgetgenerator.controller;

import com.nahuelgallardo.budgetgenerator.model.Client;
import com.nahuelgallardo.budgetgenerator.service.IClientService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clients")
public class ClientController {
    private final IClientService service;

    public ClientController(IClientService service) {
        this.service = service;
    }

    // 🔹 Obtener todos los clientes
    @GetMapping
    public List<Client> getAll() {
        return service.findAll();
    }

    // 🔹 Obtener cliente por ID
    @GetMapping("/{id}")
    public ResponseEntity<Client> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 🔹 Crear un nuevo cliente
    @PostMapping
    public ResponseEntity<Client> create(@RequestBody Client client) {
        Client created = service.save(client);
        return ResponseEntity.ok(created);
    }

    // 🔹 Actualizar un cliente existente
    @PutMapping("/{id}")
    public ResponseEntity<Client> update(@PathVariable Long id, @RequestBody Client updatedClient) {
        return service.findById(id)
                .map(existing -> {
                    updatedClient.setId(existing.getId());
                    Client saved = service.save(updatedClient);
                    return ResponseEntity.ok(saved);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // 🔹 Eliminar cliente por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
