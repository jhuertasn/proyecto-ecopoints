// src/main/java/com/example/demo/RabbitMQConfig.java
package com.example.estadisticas;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.TopicExchange; // 1. Cambiado de Fanout a Topic
import org.springframework.amqp.core.Queue;
// 1. IMPORTA EL CONVERTIDOR DE JSON
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {
// 1. EL NOMBRE DEL EXCHANGE DEBE COINCIDIR
    public static final String EXCHANGE_NAME = "entregas_exchange"; 
    public static final String QUEUE_NAME = "cola.estadisticas";
    // 2. LA ROUTING KEY DEBE COINCIDIR
    public static final String ROUTING_KEY = "entrega.validada"; 

@Bean
    TopicExchange exchange() {
        // ASEGÚRATE DE QUE ESTA LÍNEA TAMBIÉN TENGA (false, false)
        return new TopicExchange(EXCHANGE_NAME, false, false);
    }

    @Bean
    Queue queue() {
        // Y QUE LA COLA TAMBIÉN TENGA (false)
        return new Queue(QUEUE_NAME, false);
    }

    @Bean
    Binding binding(Queue queue, TopicExchange exchange) {
        // 5. El BINDING DEBE USAR LA ROUTING KEY
        return BindingBuilder.bind(queue).to(exchange).with(ROUTING_KEY);
    }

    @Bean
    public MessageConverter jsonMessageConverter() {
        // 6. EL CONVERTIDOR JSON DEBE ESTAR AQUÍ TAMBIÉN
        return new Jackson2JsonMessageConverter();
    }
}