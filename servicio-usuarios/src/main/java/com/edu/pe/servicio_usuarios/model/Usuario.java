package com.edu.pe.servicio_usuarios.model;

import jakarta.persistence.*;
import lombok.Data; // Necesitas la dependencia de Lombok en pom.xml

@Entity
@Table(name = "usuarios")
@Data
public class Usuario {
    @Id
    private String id;
    private String usuario;
    private String password;
    private String correo;
    private String rol;

    // Constructor vacío requerido por JPA
    public Usuario() {}

    public Usuario(String id, String usuario, String password, String correo, String rol) {
        this.id = id;
        this.usuario = usuario;
        this.password = password;
        this.correo = correo;
        this.rol = rol;
    }
}