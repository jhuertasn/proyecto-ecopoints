package com.edu.pe.servicio_usuarios.service;

import java.util.List;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.edu.pe.servicio_usuarios.event.EventUsuario;
import com.edu.pe.servicio_usuarios.model.Usuario; // Usamos la Entidad MySQL
import com.edu.pe.servicio_usuarios.repository.UsuarioRepository; // El repo JPA

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository; // Conexión a MySQL

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Value("${app.rabbitmq.exchange}")
    private String exchange;

    @Value("${app.rabbitmq.routing-key}")
    private String routingKey;

    // --- CREAR USUARIO (Guarda en MySQL y avisa a RabbitMQ) ---
    public void createUsuario(String id, String usuario, String password, String correo, String rol) {
        System.out.println("[UsuarioService] Creando usuario en MySQL: " + usuario);

        // 1. Crear la Entidad para la BD
        Usuario nuevoUsuario = new Usuario(id, usuario, password, correo, rol);
        
        // 2. Guardar en MySQL (¡Aquí ocurre la persistencia real!)
        usuarioRepository.save(nuevoUsuario);

        // 3. Crear el evento para RabbitMQ (Opcional, pero bueno para la arquitectura)
        EventUsuario event = new EventUsuario(id, usuario, password, correo, rol);
        try {
            rabbitTemplate.convertAndSend(exchange, routingKey, event);
            System.out.println("♥️ Evento enviado a Rabbit MQ con el usuario " + usuario);
        } catch (Exception e) {
            System.err.println("⚠️ No se pudo enviar a RabbitMQ (pero sí se guardó en BD): " + e.getMessage());
        }
    }

    // --- LOGIN (Consulta directa a MySQL) ---
    public Usuario loginUsuario(String usuario, String password) {
        System.out.println("[UsuarioService] Intentando login en DB para: " + usuario);

        // 1. Usamos el método mágico de JPA para buscar
        Usuario usuarioEncontrado = usuarioRepository.findByUsuarioAndPassword(usuario, password);

        // 2. Si es null, es que no existe o la contraseña está mal
        if (usuarioEncontrado == null) {
            throw new RuntimeException("Error: Usuario o Contraseña incorrecta.");
        }

        return usuarioEncontrado;
    }

    // --- LISTAR TODOS (Desde MySQL) ---
    public List<Usuario> getAllUsuarios() {
        System.out.println("[UsuarioService] Obteniendo usuarios de la Base de Datos...");
        return usuarioRepository.findAll();
    }
}