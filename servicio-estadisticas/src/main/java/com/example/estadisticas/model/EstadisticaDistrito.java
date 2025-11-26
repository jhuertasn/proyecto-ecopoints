package com.example.estadisticas.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "estadisticas_distritos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EstadisticaDistrito {
    @Id
    private String distrito; // Ej: "comas", "olivos"
    private Integer totalEntregas;
}