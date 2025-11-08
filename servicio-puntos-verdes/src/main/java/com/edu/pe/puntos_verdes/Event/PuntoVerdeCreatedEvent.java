package com.edu.pe.puntos_verdes.Event;

import java.io.Serializable;

public class PuntoVerdeCreatedEvent implements Serializable {

    private static final long serialVersionUID = 1L;

    private String nombre;
    private double latitud;
    private double longitud;

    public PuntoVerdeCreatedEvent() {}

    public PuntoVerdeCreatedEvent(String nombre, double latitud, double longitud) {
        this.nombre = nombre;
        this.latitud = latitud;
        this.longitud = longitud;
    }

    public String getNombre() {
        return nombre;
    }

    public double getLatitud() {
        return latitud;
    }

    public double getLongitud() {
        return longitud;
    }
}
