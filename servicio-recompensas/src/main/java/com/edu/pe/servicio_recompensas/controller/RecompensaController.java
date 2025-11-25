package com.edu.pe.servicio_recompensas.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edu.pe.servicio_recompensas.model.Canje;
import com.edu.pe.servicio_recompensas.model.Premio;
import com.edu.pe.servicio_recompensas.service.RecompensaService;

@RestController
@RequestMapping("/api/recompensas")
@CrossOrigin(origins = "*") 
public class RecompensaController {

    private final RecompensaService recompensaService;

    public RecompensaController(RecompensaService recompensaService) {
        this.recompensaService = recompensaService;
    }

    // GET /api/recompensas/premios
    @GetMapping("/premios")
    public List<Premio> listarPremios() {
        return recompensaService.obtenerPremios();
    }

    // GET /api/recompensas/canjes
    @GetMapping("/canjes")
    public List<Canje> historialCanjes() {
        return recompensaService.obtenerHistorialCanjes();
    }

    // GET /api/recompensas/puntos/{usuarioId}
    @GetMapping("/puntos/{usuarioId}")
    public ResponseEntity<Integer> obtenerPuntos(@PathVariable String usuarioId) {
        int puntos = recompensaService.obtenerPuntosActuales(usuarioId);
        return ResponseEntity.ok(puntos);
    }

    // POST /api/recompensas/canjear
    @PostMapping("/canjear")
    public ResponseEntity<?> canjearPremio(@RequestBody Map<String, String> canjeRequest) {
        String usuarioId = canjeRequest.get("usuarioId");
        String premioId = canjeRequest.get("premioId");
        
        // VALIDACIÓN: Ya no pedimos puntosActuales desde el frontend
        if (usuarioId == null || premioId == null) {
            return new ResponseEntity<>("Faltan 'usuarioId' o 'premioId' en la solicitud.", HttpStatus.BAD_REQUEST);
        }

        try {
            // CORRECCIÓN: Llamamos al servicio con solo 2 argumentos
            Canje resultado = recompensaService.realizarCanje(usuarioId, premioId);
            return new ResponseEntity<>(resultado, HttpStatus.CREATED);
            
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}