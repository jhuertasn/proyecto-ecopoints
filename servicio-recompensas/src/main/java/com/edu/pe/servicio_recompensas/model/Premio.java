package com.edu.pe.servicio_recompensas.model;

public class Premio {

    private String id;
    private String nombre;
    private int costoPuntos;
    private int stock;

    public Premio(String id, String nombre, int costoPuntos, int stock) {
        this.id = id;
        this.nombre = nombre;
        this.costoPuntos = costoPuntos;
        this.stock = stock;
    }

    // Getters y Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getCostoPuntos() {
        return costoPuntos;
    }

    public void setCostoPuntos(int costoPuntos) {
        this.costoPuntos = costoPuntos;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }
}