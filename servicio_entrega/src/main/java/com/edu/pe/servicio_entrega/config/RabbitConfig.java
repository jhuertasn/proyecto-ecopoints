// src/main/java/com/edu/pe/Config/RabbitConfig.java
package com.edu.pe.servicio_entrega.config; // O el paquete que él use

import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig { // El nombre de tu compañero era RabbitConfig

    public static final String EXCHANGE_NAME = "entregas_exchange";
    public static final String ROUTING_KEY_ENTREGA_VALIDADA = "entrega.validada";

@Bean
    public TopicExchange exchange() {
        // ASEGÚRATE DE QUE ESTA LÍNEA TENGA (false, false)
        return new TopicExchange(EXCHANGE_NAME, false, false);
    }

    // (Estos 3 beans se quedan igual, ya estaban correctos)
    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        // 2. Aseguramos que el template use el convertidor JSON
        rabbitTemplate.setMessageConverter(jsonMessageConverter());
        return rabbitTemplate;
    }
}