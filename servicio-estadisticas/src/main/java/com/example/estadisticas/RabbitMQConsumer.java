package com.example.estadisticas;

import com.example.estadisticas.model.EventoEntrega;
import com.example.estadisticas.service.EstadisticasService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RabbitMQConsumer {

    @Autowired
    private EstadisticasService estadisticasService;

    @RabbitListener(queues = "cola.estadisticas")
    public void manejarMensaje(EventoEntrega evento) {
        System.out.println("📧 [Estadísticas] Evento recibido de RabbitMQ: " + evento);
        
        estadisticasService.procesarNuevaEntrega(
            evento.getMaterial(), 
            evento.getPeso(), 
            evento.getDistrito()
        );
    }
}