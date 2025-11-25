// src/main/java/com/edu/pe/servicio_recompensas/service/RecompensaService.java
package com.edu.pe.servicio_recompensas.service;

import com.edu.pe.servicio_recompensas.model.Canje;
import com.edu.pe.servicio_recompensas.model.Premio;
import com.edu.pe.servicio_recompensas.model.Puntaje;
import com.edu.pe.servicio_recompensas.repository.CanjeRepository;
import com.edu.pe.servicio_recompensas.repository.PremioRepository;
import com.edu.pe.servicio_recompensas.repository.PuntajeRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class RecompensaService {

    private static final Logger log = LoggerFactory.getLogger(RecompensaService.class);

    @Autowired
    private PremioRepository premioRepository;
    @Autowired
    private CanjeRepository canjeRepository;
    @Autowired
    private PuntajeRepository puntajeRepository;

    // --- INICIALIZACIÓN DE DATOS ---
    @PostConstruct
    public void init() {
        if (premioRepository.count() == 0) {
            premioRepository.save(new Premio("P001", "Botella Ecológica", 500, 10, "http://imagen.com/botella.png"));
            premioRepository.save(new Premio("P002", "Bono Descuento S/10", 1000, 5, "http://imagen.com/bono.png"));
            log.info("🎁 Premios de prueba insertados en MySQL.");
        }
    }

    // --- 1. LÓGICA DE PUNTOS ---
    @Transactional
    public void procesarPuntos(String usuarioId, Double peso) {
        int puntosGanados = (int) (peso * 10);
        Puntaje puntaje = puntajeRepository.findById(usuarioId)
                .orElse(new Puntaje(usuarioId, 0));
        puntaje.setPuntosTotal(puntaje.getPuntosTotal() + puntosGanados);
        puntajeRepository.save(puntaje);
        log.info("✅ [MySQL] Usuario {} ganó {} puntos. Total: {}", usuarioId, puntosGanados, puntaje.getPuntosTotal());
    }

    // --- 2. CONSULTAR SALDO ---
    public int obtenerPuntosActuales(String usuarioId) {
        return puntajeRepository.findById(usuarioId)
                .map(Puntaje::getPuntosTotal)
                .orElse(0);
    }

    // --- 3. REALIZAR CANJE ---
    @Transactional
    public Canje realizarCanje(String usuarioId, String premioId) {
        log.info("Intentando canje -> Usuario: {}, Premio: {}", usuarioId, premioId);

        Premio premio = premioRepository.findById(premioId)
                .orElseThrow(() -> new RuntimeException("Premio no encontrado"));

        if (premio.getStock() <= 0) {
            throw new RuntimeException("Stock agotado");
        }

        Puntaje puntaje = puntajeRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario sin puntos"));

        if (puntaje.getPuntosTotal() < premio.getCostoPuntos()) {
            throw new RuntimeException("Puntos insuficientes");
        }

        // Transacción
        puntaje.setPuntosTotal(puntaje.getPuntosTotal() - premio.getCostoPuntos());
        puntajeRepository.save(puntaje);

        premio.setStock(premio.getStock() - 1);
        premioRepository.save(premio);

        Canje nuevoCanje = new Canje(UUID.randomUUID().toString(), premioId, usuarioId, premio.getCostoPuntos(), LocalDateTime.now());
        return canjeRepository.save(nuevoCanje);
    }

    public List<Premio> obtenerPremios() { return premioRepository.findAll(); }
    public List<Canje> obtenerHistorialCanjes() { return canjeRepository.findAll(); }
}