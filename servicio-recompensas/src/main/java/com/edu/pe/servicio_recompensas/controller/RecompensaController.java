package com.edu.pe.servicio_recompensas.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edu.pe.servicio_recompensas.model.Canje;
import com.edu.pe.servicio_recompensas.model.Premio;
import com.edu.pe.servicio_recompensas.service.RecompensaService;

@RestController
@RequestMapping("/api/recompensas")
public class RecompensaController {

    private final RecompensaService recompensaService;

    public RecompensaController(RecompensaService recompensaService) {
        this.recompensaService = recompensaService;
    }

    /**
     * GET /api/recompensas/premios
     * Lista todos los premios disponibles.
     */
    @GetMapping("/premios")
    public List<Premio> listarPremios() {
        return recompensaService.obtenerPremios();
    }

    /**
     * GET /api/recompensas/canjes
     * Lista el historial de canjes realizados (solo en memoria).
     */
    @GetMapping("/canjes")
    public List<Canje> historialCanjes() {
        return recompensaService.obtenerHistorialCanjes();
    }

    /**
     * POST /api/recompensas/canjear
     * Intenta realizar un canje de puntos.
     * Cuerpo de la solicitud (JSON):
     * {
     * "usuarioId": "U123",
     * "premioId": "P001",
     * "puntosActuales": 700
     * }
     */
    @PostMapping("/canjear")
    public ResponseEntity<?> canjearPremio(@RequestBody Map<String, Object> canjeRequest) {
        String usuarioId = (String) canjeRequest.get("usuarioId");
        String premioId = (String) canjeRequest.get("premioId");
        // Asumimos que los puntos vienen como Integer, si no, se manejaría un error de
        // conversión.
        int puntosActuales = (Integer) canjeRequest.get("puntosActuales");

        // Validación básica de campos
        if (usuarioId == null || premioId == null) {
            return new ResponseEntity<>("Faltan 'usuarioId' o 'premioId' en la solicitud.", HttpStatus.BAD_REQUEST);
        }

        Canje resultado = recompensaService.realizarCanje(usuarioId, premioId, puntosActuales);

        if (resultado != null) {
            // Canje exitoso
            return new ResponseEntity<>(resultado, HttpStatus.CREATED);
        } else {
            // El servicio maneja el log del por qué falló
            return new ResponseEntity<>(
                    "El canje falló. Revisa el log del servidor. (Posibles causas: stock insuficiente, premio no existe, puntos insuficientes)",
                    HttpStatus.BAD_REQUEST);
        }
    }
}