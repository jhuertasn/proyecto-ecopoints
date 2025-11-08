package com.edu.pe.puntos_verdes.Event;

import com.edu.pe.puntos_verdes.Config.RabbitMQConfig;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
public class PuntoVerdeProducer {

    private final RabbitTemplate rabbitTemplate;

    public PuntoVerdeProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void sendPuntoVerdeCreatedEvent(PuntoVerdeCreatedEvent event) {
        // LÍNEA CORREGIDA:
rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_PUNTOS_VERDES, "", event);
        System.out.println("✅ Evento PuntoVerde creado: " + event.getNombre());
    }
}
