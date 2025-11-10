package com.edu.pe.servicio_recompensas.model;

import java.time.LocalDateTime;

public class Canje {

    private String id;
    private String premioId;
    private String usuarioId;
    private int puntosUtilizados;
    private LocalDateTime fechaCanje;

    public Canje(String id, String premioId, String usuarioId, int puntosUtilizados) {
        this.id = id;
        this.premioId = premioId;
        this.usuarioId = usuarioId;
        this.puntosUtilizados = puntosUtilizados;
        this.fechaCanje = LocalDateTime.now();
    }

    // Getters
    public String getId() {
        return id;
    }

    public String getPremioId() {
        return premioId;
    }

    public String getUsuarioId() {
        return usuarioId;
    }

    public int getPuntosUtilizados() {
        return puntosUtilizados;
    }

    public LocalDateTime getFechaCanje() {
        return fechaCanje;
    }
}