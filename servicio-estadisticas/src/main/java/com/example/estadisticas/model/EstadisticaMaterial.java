package com.example.estadisticas.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "estadisticas_materiales")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EstadisticaMaterial {
    @Id
    private String material; // Ej: "vidrio", "plastico"
    private Double totalKg;
}