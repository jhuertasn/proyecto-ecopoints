package com.edu.pe.servicio_recompensas.config;

import com.edu.pe.servicio_recompensas.model.EventoEntrega;
import com.edu.pe.servicio_recompensas.service.RecompensaService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class RabbitMQConsumer {

    private static final Logger log = LoggerFactory.getLogger(RabbitMQConsumer.class);

    @Autowired
    private RecompensaService recompensaService; // Inyectamos el servicio AQUÍ

    // Escucha la cola definida en application.properties
    @RabbitListener(queues = "${reward.rabbitmq.queue.name}")
    public void receiveMessage(EventoEntrega evento) {
        log.info("📧 MENSAJE RECIBIDO (RabbitMQ): {}", evento);
        
        // Llamamos al servicio para procesar la lógica
        recompensaService.procesarPuntos(evento.getUsuarioId(), evento.getPeso());
        
        log.info("✅ Puntos procesados correctamente.");
    }
}