package com.example.estadisticas.controller;

import com.example.estadisticas.service.EstadisticasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/estadisticas")
@CrossOrigin(origins = "*")
public class EstadisticasController {

    @Autowired
    private EstadisticasService estadisticasService;

    @GetMapping("/globales")
    public ResponseEntity<Map<String, Object>> getEstadisticas() {
        return ResponseEntity.ok(estadisticasService.obtenerDatosDashboard());
    }
}