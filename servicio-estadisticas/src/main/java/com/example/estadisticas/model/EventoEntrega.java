package com.example.estadisticas.model;

import lombok.Data;

@Data
public class EventoEntrega {
    private String usuarioId; // String para que coincida con el productor
    private Double peso;
    private String material;
    private String distrito;  // Agregado para el reporte municipal
}