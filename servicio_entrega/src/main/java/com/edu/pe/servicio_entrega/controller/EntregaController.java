package com.edu.pe.servicio_entrega.controller;

import com.edu.pe.servicio_entrega.model.Entrega;
import com.edu.pe.servicio_entrega.service.EntregaService;
import lombok.RequiredArgsConstructor;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
// La URL base será http://localhost:8082/servicio-entregas/entregas
@RequestMapping("/entregas") 
@RequiredArgsConstructor
public class EntregaController {

    private final EntregaService entregaService;

    /**
     * Endpoint: POST http://localhost:8082/servicio-entregas/entregas
     * BODY (JSON):
     * {
     * "usuarioId": 123,
     * "material": "botellas",
     * "peso": 2.5,
     * "fotoUrl": "http://foto.com/img.png"
     * }
     */
    @PostMapping
    public ResponseEntity<Entrega> registrarEntrega(@Valid @RequestBody Entrega entrega) {
        Entrega entregaRegistrada = entregaService.registrarEntrega(entrega);
        // Devolverá la entrega con un ID falso y estado PENDIENTE
        return ResponseEntity.status(HttpStatus.CREATED).body(entregaRegistrada);
    }

    /**
     * Endpoint: PUT http://localhost:8082/servicio-entregas/entregas/cualquier-cosa/validar
     * (Puedes poner cualquier texto como "cualquier-cosa" en el ID)
     */
    @PutMapping("/{id}/validar")
    public ResponseEntity<Entrega> validarEntrega(@PathVariable String id) {
        try {
            Entrega entregaValidada = entregaService.validarEntrega(id);
            // Devolverá la entrega de EJEMPLO con estado VALIDADA
            return ResponseEntity.ok(entregaValidada);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}