package com.edu.pe.servicio_usuarios.service;

import java.util.Collection;
import java.util.Optional;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.edu.pe.servicio_usuarios.event.EventUsuario;
import com.edu.pe.servicio_usuarios.repository.UsuarioRepositorio;

@Service
public class UsuarioService {

    private final RabbitTemplate rabbitTemplate;
    private final UsuarioRepositorio usuarioRepositorio;

    @Value("${app.rabbitmq.exchange}")
    private String exchange;

    @Value("${app.rabbitmq.routing-key}")
    private String routingKey;

    public UsuarioService(RabbitTemplate rabbitTemplate, UsuarioRepositorio usuarioRepositorio) {
        this.rabbitTemplate = rabbitTemplate;
        this.usuarioRepositorio = usuarioRepositorio;
    }

    public void createUsuario(String id, String usuario, String password, String correo, String rol) {
        System.out.println("[UsuarioService] usuario creado: " + usuario);
        System.out.println("[UsuarioService] password creado: " + password);
        System.out.println("[UsuarioService] rol creado: " + rol);

        EventUsuario event = new EventUsuario(id, usuario, password, correo, rol);
        usuarioRepositorio.save(event);

        rabbitTemplate.convertAndSend(exchange, routingKey, event);
        System.out.println("♥️ Evento enviado a Rabbit MQ con el usuario " + event.getUsuario());
    }

    public EventUsuario loginUsuario(String usuario, String password) {
        System.out.println("[UsuarioService] Intentando login para: " + usuario);

        if (!usuarioRepositorio.existsByUsuario(usuario)) {
            throw new RuntimeException("Error: Usuario o Contraseña incorrecta.");
        }
        Optional<EventUsuario> usuarioEncontradoOpt = usuarioRepositorio.findByUsuario(usuario);
        if (usuarioEncontradoOpt.isEmpty()) {
            throw new RuntimeException("Error: Usuario o Contraseña incorrecta.");
        }

        EventUsuario usuarioEncontrado = usuarioEncontradoOpt.get();

        String hashedPasswordInput = UsuarioRepositorio.hashPassword(password);

        if (!usuarioEncontrado.getPassword().equals(hashedPasswordInput)) {
            throw new RuntimeException("Error: Usuario o Contraseña incorrecta.");
        }

        return usuarioEncontrado;
    }

     // --- LÓGICA DE LISTAR ---
    // "y otro de usuarios listas"
    public Collection<EventUsuario> getAllUsuarios() {
        System.out.println("[UsuarioService] Obteniendo la lista de usuarios en memoria");
        return usuarioRepositorio.findAll();
    }
}
