package com.edu.pe.servicio_entrega.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * Este es nuestro Modelo.
 * ¡SIN ANOTACIONES de Base de Datos! Es un simple objeto (POGO).
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Entrega {

    private String id; // Se generará un ID falso

    @NotNull(message = "El ID de usuario no puede ser nulo")
    private Long usuarioId; 

    @NotBlank(message = "El material no puede estar vacío")
    private String material; 

    @NotNull(message = "El peso no puede ser nulo")
    @Min(value = 0, message = "El peso no puede ser negativo")
    private Double peso; 
    
    private String fotoUrl; 

    private String estado; // "PENDIENTE", "VALIDADA"
}