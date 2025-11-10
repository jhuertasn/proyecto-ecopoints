// servicio-recompensas/src/main/java/com/edu/pe/config/RabbitMQConsumer.java
package com.edu.pe.servicio_recompensas.config; // (o el paquete que él use)

import com.edu.pe.servicio_recompensas.model.EventoEntrega; // ¡Importa el DTO!
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class RabbitMQConsumer {

    private static final Logger log = LoggerFactory.getLogger(RabbitMQConsumer.class);

    @RabbitListener(queues = "${reward.rabbitmq.queue.name}")
    public void receiveMessage(EventoEntrega evento) { // 1. Cambiado de String a EventoEntrega
        log.info("📧 MENSAJE RECIBIDO (RabbitMQ): {}", evento);

        // 2. Aquí iría la lógica de su servicio (ej. sumar puntos)
        // Ejemplo: recompensaService.asignarPuntos(evento.getUsuarioId(), evento.getPeso());

        log.info("Procesamiento de recompensa completado para el usuario: {}", evento.getUsuarioId());
    }
}