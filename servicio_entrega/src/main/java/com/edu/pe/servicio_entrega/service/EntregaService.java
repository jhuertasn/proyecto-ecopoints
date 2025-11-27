package com.edu.pe.servicio_entrega.service;

import com.edu.pe.servicio_entrega.config.RabbitConfig;
import com.edu.pe.servicio_entrega.model.Entrega;
import com.edu.pe.servicio_entrega.repository.EntregaRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import java.util.UUID; // Importante para generar IDs

@Service
@RequiredArgsConstructor
@Slf4j
public class EntregaService {

    private final EntregaRepository entregaRepository;
    private final RabbitTemplate rabbitTemplate;

    private record EntregaValidadaEvent(
        String usuarioId, 
        Double peso, 
        String material,
        String distrito
    ) {}

    /**
     * Registrar nueva entrega (POST)
     */
    public Entrega registrarEntrega(Entrega nuevaEntrega) {
        // 1. Generar ID único (UUID)
        nuevaEntrega.setId(UUID.randomUUID().toString());
        
        // 2. Setear estado inicial
        nuevaEntrega.setEstado("PENDIENTE");
        
        log.info("Servicio: Guardando nueva entrega en MySQL: {}", nuevaEntrega);
        
        // 3. Guardar en base de datos real
        return entregaRepository.save(nuevaEntrega);
    }

    /**
     * Validar entrega (PUT)
     */
    public Entrega validarEntrega(String id) {
        log.info("Servicio: Buscando en MySQL entrega con id: {}", id);
        
        // 1. Buscar en MySQL
        Entrega entrega = entregaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entrega no encontrada en BD"));
          // --- PROTECCIÓN DE CONCURRENCIA  ---
        // Si la entrega YA NO es 'PENDIENTE', lanzamos error.      
        if (!"PENDIENTE".equals(entrega.getEstado())) {
            throw new RuntimeException("¡Error! Esta entrega ya fue validada por otro recolector.");
        }

        // 2. Actualizar estado
        entrega.setEstado("VALIDADA");
        
        // 3. Actualizar en MySQL
        Entrega entregaValidada = entregaRepository.save(entrega);

        // 4. Crear evento
        EntregaValidadaEvent event = new EntregaValidadaEvent(
                entregaValidada.getUsuarioId(),
                entregaValidada.getPeso(),
                entregaValidada.getMaterial(),
                entregaValidada.getDistrito()
        );

        // 5. Publicar en RabbitMQ
        log.info("Servicio: Publicando evento en RabbitMQ: {}", event);
        rabbitTemplate.convertAndSend(
                RabbitConfig.EXCHANGE_NAME,
                RabbitConfig.ROUTING_KEY_ENTREGA_VALIDADA,
                event
        );

        return entregaValidada;
    }

    public java.util.List<Entrega> listarTodas() {
        return entregaRepository.findAll();
    }
}