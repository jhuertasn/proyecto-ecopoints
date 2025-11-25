package com.edu.pe.servicio_recompensas.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "premios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Premio {
    @Id
    private String id;
    private String nombre;
    private int costoPuntos;
    private int stock;
    private String imagenUrl; // Agreguemos esto para el frontend
}