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
    private Double latitud;     // "lat" en tu frontend
    private Double longitud;    // "lng" en tu frontend

    // Constructor vacío y con parámetros
    public PuntoVerde() {}
    public PuntoVerde(String nombre, String direccion, String tipo, Double latitud, Double longitud) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.latitud = latitud;
        this.tipo = tipo;
        this.longitud = longitud;
    }
}