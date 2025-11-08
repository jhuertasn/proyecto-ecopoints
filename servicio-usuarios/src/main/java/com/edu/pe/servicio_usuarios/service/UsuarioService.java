package com.edu.pe.servicio_usuarios.service;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.stereotype.Service;

import com.edu.pe.servicio_usuarios.event.EventUsuario;


@Service
public class UsuarioService {

    private final RabbitTemplate rabbitTemplate ; 

    @Value("${app.rabbitmq.exchange}")
    private String exchange;
    
    @Value("${app.rabbitmq.routing-key}")
    private String routingKey;

    

    public UsuarioService(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    // USUARIO LOGIN DE RABBITMQ

    // USUARIO REGISTRO CREADO DE RABBITMQ

    public void createUsuario(String id, String usuario,String password ,String correo, String rol){
        System.out.println("[UsuarioServie] usuario creado: " + usuario);
        System.out.println("[UsuarioServie] password creado: " + password);
        System.out.println("[UsuarioService] rol creado: " + rol);

        EventUsuario event = new EventUsuario(id, usuario,password,correo,rol);

        rabbitTemplate.convertAndSend(exchange, routingKey, event);
        System.out.println("Evento enviado a Rabbit MQ con el usuario " + event.getUsuario());
    }

}
