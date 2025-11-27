package com.edu.pe.puntos_verdes.Model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "puntos_verdes")
@Data
public class PuntoVerde {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nombre;
    private String direccion; 
    private String tipo;
    
    // --- CAMPO NUEVO QUE FALTABA ---
    private String distrito; 
    // -------------------------------

    private Double latitud;
    private Double longitud;

    public PuntoVerde() {}

    // Constructor actualizado con distrito
    public PuntoVerde(String nombre, String direccion, String tipo, String distrito, Double latitud, Double longitud) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.tipo = tipo;
        this.distrito = distrito; // <--- Asignar aquí
        this.latitud = latitud;
        this.longitud = longitud;
    }
}