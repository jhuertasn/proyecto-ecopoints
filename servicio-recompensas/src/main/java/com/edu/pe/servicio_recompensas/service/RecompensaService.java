package com.edu.pe.servicio_recompensas.service;

import com.edu.pe.servicio_recompensas.model.Canje;
import com.edu.pe.servicio_recompensas.model.Premio;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class RecompensaService {

    private static final Logger log = LoggerFactory.getLogger(RecompensaService.class);

    // **Simulación de Almacenamiento en Memoria**
    private final List<Premio> premios = new ArrayList<>();
    private final List<Canje> canjes = new ArrayList<>();
    private long nextCanjeId = 1;

    // Inicialización de premios de prueba
    public RecompensaService() {
        premios.add(new Premio("P001", "Botella Ecológica", 500, 10));
        premios.add(new Premio("P002", "Bono Descuento S/10", 1000, 5));
        log.info("Cargados {} premios de prueba en memoria.", premios.size());
    }

    /**
     * Obtiene la lista de todos los premios disponibles.
     */
    public List<Premio> obtenerPremios() {
        log.info("Consulta de todos los premios disponibles.");
        return premios;
    }

    /**
     * Intenta realizar un canje de puntos por un premio.
     *
     * @param usuarioId      ID del usuario que canjea.
     * @param premioId       ID del premio a canjear.
     * @param puntosActuales Puntos que el usuario tiene actualmente (simulado).
     * @return El objeto Canje si es exitoso, o null si falla.
     */
    public Canje realizarCanje(String usuarioId, String premioId, int puntosActuales) {
        log.info("Intentando canje del usuario ID: {} por premio ID: {}", usuarioId, premioId);

        Optional<Premio> premioOpt = premios.stream()
                .filter(p -> p.getId().equals(premioId))
                .findFirst();

        if (premioOpt.isEmpty()) {
            log.warn("Fallo el canje: Premio ID {} no encontrado.", premioId);
            return null; // Premio no existe
        }

        Premio premio = premioOpt.get();

        if (premio.getStock() <= 0) {
            log.warn("Fallo el canje: Premio ID {} sin stock (stock actual: {}).", premioId, premio.getStock());
            return null; // Sin stock
        }

        if (puntosActuales < premio.getCostoPuntos()) {
            log.warn("Fallo el canje: Puntos insuficientes. Usuario tiene {} y necesita {}.", puntosActuales,
                    premio.getCostoPuntos());
            return null; // Puntos insuficientes
        }

        // --- Simulación de Actualización ---
        premio.setStock(premio.getStock() - 1); // Decrementar stock

        String nuevoCanjeId = "C" + nextCanjeId++;
        Canje nuevoCanje = new Canje(nuevoCanjeId, premioId, usuarioId, premio.getCostoPuntos());
        canjes.add(nuevoCanje); // Registrar el canje

        log.info("✅ Canje exitoso (ID: {}). Stock de {} restante: {}. Puntos utilizados: {}",
                nuevoCanjeId, premio.getNombre(), premio.getStock(), premio.getCostoPuntos());

        return nuevoCanje;
    }

    /**
     * Obtiene la lista de todos los canjes realizados (historial).
     */
    public List<Canje> obtenerHistorialCanjes() {
        log.info("Consulta del historial de canjes (total: {}).", canjes.size());
        return canjes;
    }
}