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
        // Solo llenamos si está vacío
        if (premioRepository.count() == 0) {
            log.info("🎁 Cargando catálogo completo de premios...");

            // 1. Beneficios Prácticos
            premioRepository.save(new Premio("P001", "Descuento Eco-Tienda", 200, 50, "img_desc"));
            premioRepository.save(new Premio("P002", "Cupón Online", 250, 30, "img_cupon"));
            premioRepository.save(new Premio("P003", "Crédito Eco-Transporte", 150, 100, "img_bus"));
            premioRepository.save(new Premio("P004", "Entrada Cultural", 300, 20, "img_entradas"));
            premioRepository.save(new Premio("P005", "Comida Saludable", 280, 40, "img_comida"));

            // 2. Ecológicas
            premioRepository.save(new Premio("P006", "Semillas Urbanas", 180, 200, "img_semillas"));
            premioRepository.save(new Premio("P007", "Kit Reutilizable", 350, 15, "img_kit")); // La botella
            premioRepository.save(new Premio("P008", "Accesorio Reciclado", 220, 25, "img_mochila"));
            premioRepository.save(new Premio("P009", "Planta un Árbol", 500, 1000, "img_arbol"));

            // 3. Gamificación (Costo 0 o bajo)
            premioRepository.save(new Premio("P010", "Medalla Digital", 50, 9999, "img_medalla"));
            premioRepository.save(new Premio("P011", "Ranking Mensual", 0, 9999, "img_competencia"));
            premioRepository.save(new Premio("P012", "Compartir Logros", 0, 9999, "img_logro"));

            // 4. Financieras (¡IMPORTANTE PARA TU PRUEBA!)
            premioRepository.save(new Premio("P013", "Cashback Digital", 400, 50, "img_cashback"));
            premioRepository.save(new Premio("P014", "Tarjeta Prepago", 550, 20, "img_tarjeta"));
            premioRepository.save(new Premio("P015", "Donación a ONG", 100, 9999, "img_donacion")); // <--- ESTE ES EL
                                                                                                    // DE 100 PUNTOS

            // 5. Sociales
            premioRepository.save(new Premio("P016", "Talleres Gratis", 200, 30, "img_taller"));
            premioRepository.save(new Premio("P017", "Eventos Verdes", 180, 50, "img_evento"));
            premioRepository.save(new Premio("P018", "Top Reciclador", 0, 9999, "img_listado"));

            log.info("✅ Premios insertados en MySQL.");
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

        Canje nuevoCanje = new Canje(UUID.randomUUID().toString(), premioId, usuarioId, premio.getCostoPuntos(),
                LocalDateTime.now());
        return canjeRepository.save(nuevoCanje);
    }

    public List<Premio> obtenerPremios() {
        return premioRepository.findAll();
    }

    public List<Canje> obtenerHistorialCanjes() {
        return canjeRepository.findAll();
    }
}