package com.example.estadisticas.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "estadisticas_globales")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EstadisticaGlobal {
    @Id
    private Long id = 1L; // Siempre usaremos el ID 1
    private Integer totalEntregas = 0;
    private Double totalKgReciclados = 0.0;
}