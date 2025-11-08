package com.edu.pe.puntos_verdes.Service;

import com.edu.pe.puntos_verdes.Model.PuntoVerdeDTO;
import com.edu.pe.puntos_verdes.Event.PuntoVerdeCreatedEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PuntoVerdeService {

    private static final Logger logger = LoggerFactory.getLogger(PuntoVerdeService.class);

    private final RabbitTemplate rabbitTemplate;

    private static final String EXCHANGE = "puntosVerdesExchange";
    private static final String ROUTING_KEY = "puntoVerde.creado";

    private final List<PuntoVerdeDTO> puntos = new ArrayList<>();

    public PuntoVerdeService(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public List<PuntoVerdeDTO> obtenerPuntos() {
        return puntos;
    }

    public void crearPunto(PuntoVerdeDTO dto) {

        puntos.add(dto);

        logger.info("✅ Punto Verde creado: Nombre={}, Lat={}, Lng={}",
                dto.getNombre(), dto.getLatitud(), dto.getLongitud());

        PuntoVerdeCreatedEvent event = new PuntoVerdeCreatedEvent(
                dto.getNombre(),
                dto.getLatitud(),
                dto.getLongitud()
        );

        rabbitTemplate.convertAndSend(EXCHANGE, ROUTING_KEY, event);

        logger.info("📤 Evento enviado a RabbitMQ: {}", event.getNombre());
    }
}
