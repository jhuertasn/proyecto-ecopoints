package com.edu.pe.servicio_entrega.model;

import jakarta.persistence.*; // Importante para MySQL
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity // 1. Esto convierte la clase en Tabla
@Table(name = "entregas") // 2. Nombre de la tabla en la BD
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Entrega {

    @Id // 3. Clave primaria
    private String id;

    @NotNull(message = "El ID de usuario no puede ser nulo")
    private String usuarioId;

    @NotBlank(message = "El material no puede estar vacío")
    private String material; 

    @NotNull(message = "El peso no puede ser nulo")
    @Min(value = 0, message = "El peso no puede ser negativo")
    private Double peso; 
    
    private String fotoUrl; 

    private String estado; // "PENDIENTE", "VALIDADA"

    private String comentarios;
}