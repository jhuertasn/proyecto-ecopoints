package com.edu.pe.servicio_recompensas.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "puntajes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Puntaje {
    @Id
    private String usuarioId;
    private int puntosTotal;
}