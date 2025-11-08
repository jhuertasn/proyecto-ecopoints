// src/main/java/com/example/demo/RabbitMQConfig.java
package com.example.estadisticas;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.FanoutExchange;
import org.springframework.amqp.core.Queue;
// 1. IMPORTA EL CONVERTIDOR DE JSON
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String EXCHANGE_NAME = "eventos_entregas";
    public static final String QUEUE_NAME = "cola.estadisticas";

    // ... (Tu @Bean para FanoutExchange y Queue se quedan igual)
    @Bean
    FanoutExchange exchange() {
        return new FanoutExchange(EXCHANGE_NAME, false, false);
    }

    @Bean
    Queue queue() {
        return new Queue(QUEUE_NAME, false);
    }

    @Bean
    Binding binding(Queue queue, FanoutExchange exchange) {
        return BindingBuilder.bind(queue).to(exchange);
    }

    // 2. AÑADE ESTE BEAN. ESTA ES LA SOLUCIÓN.
    // Esto le dice a Spring: "Oye, cuando veas un mensaje con contentType=application/json,
    // usa esta herramienta (Jackson) para convertirlo a un objeto Java."
    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }
}