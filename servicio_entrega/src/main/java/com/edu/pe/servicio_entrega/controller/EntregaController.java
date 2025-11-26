package com.edu.pe.servicio_entrega.controller;

import com.edu.pe.servicio_entrega.model.Entrega;
import com.edu.pe.servicio_entrega.repository.EntregaRepository;
import com.edu.pe.servicio_entrega.service.EntregaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/entregas")
@CrossOrigin(origins = "*") // Permite peticiones desde React
public class EntregaController {

    @Autowired
    private EntregaService entregaService;

    @Autowired
    private EntregaRepository entregaRepository;

    // POST: Crear nueva entrega (Ciudadano)
    @PostMapping
    public ResponseEntity<Entrega> registrarEntrega(@RequestBody Entrega entrega) {
        Entrega nuevaEntrega = entregaService.registrarEntrega(entrega);
        return new ResponseEntity<>(nuevaEntrega, HttpStatus.CREATED);
    }

    // PUT: Validar entrega (Recolector)
    @PutMapping("/{id}/validar")
    public ResponseEntity<Entrega> validarEntrega(@PathVariable String id) {
        try {
            Entrega entregaValidada = entregaService.validarEntrega(id);
            return ResponseEntity.ok(entregaValidada);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // 1. Para el Recolector: Listar solo las PENDIENTES
    @GetMapping("/pendientes")
    public List<Entrega> listarPendientes() {
        // Necesitarán crear este método en el repositorio o usar findAll y filtrar con
        // stream
        // Opción fácil: return entregaRepository.findAll().stream().filter(e ->
        // "PENDIENTE".equals(e.getEstado())).toList();
        return entregaRepository.findByEstado("PENDIENTE");
    }

    // 2. Para el Ciudadano: Listar sus propias entregas
    @GetMapping("/usuario/{usuarioId}")
    public List<Entrega> listarPorUsuario(@PathVariable String usuarioId) {
        return entregaRepository.findByUsuarioId(usuarioId);
    }

    @GetMapping("/validadas")
    public List<Entrega> listarValidadas() {
        return entregaRepository.findByEstado("VALIDADA");
    }

    @GetMapping("/todas")
public ResponseEntity<List<Entrega>> obtenerTodas() {
    // Esto devuelve la lista completa de la base de datos MySQL
    return ResponseEntity.ok(entregaService.listarTodas());
}

    
    // GET: Listar todas (opcional, útil para pruebas)
    // @GetMapping
    // public List<Entrega> listarEntregas() { ... }
}