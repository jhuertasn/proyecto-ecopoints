package com.edu.pe.servicio_usuarios.event;

import java.io.Serializable;

public class EventUsuario implements Serializable {

    private static final Long serializableLongUI = 1L;
    private String id;
    private String usuario;
    private String password;
    private String correo;
    private String rol;

    public EventUsuario() {
    }

    public EventUsuario(String id, String usuario, String password, String correo, String rol) {
        this.id = id;
        this.usuario = usuario;
        this.password = password;
        this.correo = correo;
        this.rol = rol;
    }

    public static Long getSerializablelongui() {
        return serializableLongUI;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

}
