package com.edu.pe.servicio_entrega.service;

import com.edu.pe.servicio_entrega.config.RabbitConfig;
import com.edu.pe.servicio_entrega.model.Entrega;
import com.edu.pe.servicio_entrega.repository.EntregaRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EntregaService {

    private final EntregaRepository entregaRepository;
    private final RabbitTemplate rabbitTemplate;

    // Este 'record' es el "evento" que te pidieron. 
    // Lo definimos aquí adentro porque es simple.
    private record EntregaValidadaEvent(
        Long usuarioId, 
        Double peso, 
        String material
    ) {}

    /**
     * Lógica para registrar una nueva entrega (POST /entregas)
     */
    public Entrega registrarEntrega(Entrega nuevaEntrega) {
        nuevaEntrega.setEstado("PENDIENTE");
        log.info("Servicio: Registrando nueva entrega...");
        // Llama al repositorio FALSO, que le pondrá un ID y lo logueará
        return entregaRepository.save(nuevaEntrega);
    }

    /**
     * Lógica para validar una entrega (PUT /entregas/{id}/validar)
     */
    public Entrega validarEntrega(String id) {
        log.info("Servicio: Validando entrega con id: {}", id);
        
        // 1. Llama al repositorio FALSO (que SIEMPRE encontrará una entrega "PENDIENTE")
        Entrega entrega = entregaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entrega no encontrada")); // (Nunca pasará)

        // 2. Actualizar el estado
        entrega.setEstado("VALIDADA");
        
        // 3. "Guardar" la entrega (solo la logueará)
        Entrega entregaValidada = entregaRepository.save(entrega);

        // 4. Crear el evento/mensaje para RabbitMQ
        EntregaValidadaEvent event = new EntregaValidadaEvent(
                entregaValidada.getUsuarioId(),
                entregaValidada.getPeso(),
                entregaValidada.getMaterial()
        );

        // 5. Publicar el mensaje en RabbitMQ
        log.info("Servicio: Publicando evento en RabbitMQ: {}", event);
        rabbitTemplate.convertAndSend(
                RabbitConfig.EXCHANGE_NAME,
                RabbitConfig.ROUTING_KEY_ENTREGA_VALIDADA,
                event
        );

        return entregaValidada;
    }
}