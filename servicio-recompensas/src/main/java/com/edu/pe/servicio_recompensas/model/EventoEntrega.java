// servicio-recompensas/src/main/java/com/edu/pe/dto/EventoEntrega.java
package com.edu.pe.servicio_recompensas.model;

// (Necesitará Lombok. Si no lo tiene, debe añadir los getters/setters/constructors)
import lombok.Data;

@Data
public class EventoEntrega {
    // Los campos DEBEN llamarse igual que en el publicador
    private Long usuarioId;
    private Double peso;
    private String material;
}