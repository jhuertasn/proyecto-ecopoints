// servicio-recompensas/src/main/java/com/edu/pe/config/RabbitMQConfig.java
package com.edu.pe.servicio_recompensas.config; // (o el paquete que él use)

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    // Lee los nombres unificados del application.properties
    @Value("${reward.rabbitmq.queue.name}")
    private String queueName;

    @Value("${reward.rabbitmq.exchange.name}")
    private String exchangeName;

    @Value("${reward.rabbitmq.routing.key}")
    private String routingKey;

    @Bean
    public Queue rewardsQueue() {
        return new Queue(queueName, false); // No durable (false)
    }

    @Bean
    public TopicExchange deliveriesExchange() {
        return new TopicExchange(exchangeName, false, false); // No durable (false)
    }

    @Bean
    public Binding binding(Queue rewardsQueue, TopicExchange deliveriesExchange) {
        return BindingBuilder.bind(rewardsQueue)
                .to(deliveriesExchange)
                .with(routingKey);
    }

    // ¡CRÍTICO! Añade el convertidor de JSON
    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    // (Opcional pero recomendado)
    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory, MessageConverter messageConverter) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(messageConverter);
        return rabbitTemplate;
    }
}