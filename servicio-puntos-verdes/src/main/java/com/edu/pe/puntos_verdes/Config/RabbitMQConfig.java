package com.edu.pe.puntos_verdes.Config;

import org.springframework.amqp.core.FanoutExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    // Define el nombre del exchange que quieres usar
    public static final String EXCHANGE_PUNTOS_VERDES = "puntosVerdesExchange";

    @Bean
    public FanoutExchange puntosVerdesExchange() {
        // Esto le dice a Spring Boot:
        // "Al arrancar, asegúrate de que exista un FanoutExchange 
        // llamado 'puntosVerdesExchange', y que NO sea durable (false)"
        // Usamos 'false' para que coincida con la configuración de tus otros servicios.
        return new FanoutExchange(EXCHANGE_PUNTOS_VERDES, false, false);
    }
}
