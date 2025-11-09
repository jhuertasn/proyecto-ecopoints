// servicio_entrega/repository/EntregaRepository.java
package com.edu.pe.servicio_entrega.repository;

import com.edu.pe.servicio_entrega.model.Entrega;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.Map; // Importa Map
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap; // Importa el Mapa concurrente

/**
 * Esta es nuestra "Base de Datos Falsa" que AHORA SÍ RECUERDA las cosas.
 */
@Repository
@Slf4j // Para usar log.info()
public class EntregaRepository {

    // 1. AÑADIMOS UNA "BASE DE DATOS" EN MEMORIA REAL
    // (Un Mapa que guarda la entrega usando su ID como llave)
    private final Map<String, Entrega> db = new ConcurrentHashMap<>();

    /**
     * Simula guardar una entrega.
     */
    public Entrega save(Entrega entrega) {
        // Si es una entrega nueva (no tiene ID), le asignamos uno.
        if (entrega.getId() == null) {
            entrega.setId(UUID.randomUUID().toString()); // ID Falso
            log.info("[LOG-BASE-DATOS] CREANDO Entrega: {}", entrega);
        } else {
            // Si ya tiene ID, simulamos una actualización.
            log.info("[LOG-BASE-DATOS] ACTUALIZANDO Entrega: {}", entrega);
        }
        
        // 2. GUARDAMOS LA ENTREGA EN NUESTRO MAPA
        db.put(entrega.getId(), entrega);

        return entrega;
    }

    /**
     * Simula buscar una entrega por ID.
     * ¡CORREGIDO! Ahora buscará en nuestro mapa la entrega real
     * que se guardó en el paso anterior.
     */
    public Optional<Entrega> findById(String id) {
        log.info("[LOG-BASE-DATOS] Buscando Entrega con id: {}", id);
        
        // 3. BUSCA LA ENTREGA REAL EN EL MAPA
        Entrega entregaEncontrada = db.get(id);

        if (entregaEncontrada == null) {
            log.warn("[LOG-BASE-DATOS] ¡No se encontró la entrega! Devolviendo Optional.empty()");
            return Optional.empty();
        }

        log.info("[LOG-BASE-DATOS] Encontrada: {}", entregaEncontrada);
        // 4. DEVUELVE LA ENTREGA QUE ENCONTRÓ
        return Optional.of(entregaEncontrada);
    }
}