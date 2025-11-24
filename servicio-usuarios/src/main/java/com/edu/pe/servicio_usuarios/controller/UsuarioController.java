package com.edu.pe.servicio_usuarios.controller;

import java.util.Collection;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// IMPORTANTE: Importamos la Entidad Usuario (MySQL), no el Evento
import com.edu.pe.servicio_usuarios.model.Usuario;
import com.edu.pe.servicio_usuarios.service.UsuarioService;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {
    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/registro")
    public ResponseEntity<String> createUsuario(@RequestBody Map<String, String> body) {
        String usuario = body.get("usuario");
        String password = body.get("password");
        String correo = body.get("correo");
        String rol = body.get("rol");

        if (usuario == null || usuario.isBlank()) {
            return ResponseEntity.badRequest().body("🔴 El nombre de usuario no puede estar vacío");
        }
        if (password == null || password.isBlank()) {
            return ResponseEntity.badRequest().body("🔴 La contraseña no puede estar vacía");
        }
        if (correo == null || !correo.contains("@")) {
            return ResponseEntity.badRequest().body("🔴 Correo inválido");
        }
        // ACTUALIZACIÓN: Agregamos "Municipalidad" a los roles permitidos
        if (rol == null || (!rol.equals("Recolector") && !rol.equals("Ciudadano") && !rol.equals("Municipalidad"))) {
            return ResponseEntity.badRequest().body("🔴 El rol debe ser 'Recolector', 'Ciudadano' o 'Municipalidad'");
        }

        // Generar ID único para usuario
        String id = "ECO-" + java.util.UUID.randomUUID().toString();

        usuarioService.createUsuario(id, usuario, password, correo, rol);

        return ResponseEntity.ok("👦 Usuario Registrado: " + usuario);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUsuario(@RequestBody Map<String, String> body) {
        String usuario = body.get("usuario");
        String password = body.get("password");

        if (usuario == null || usuario.isBlank() || password == null || password.isBlank()) {
            return ResponseEntity.badRequest().body("🔴 Usuario y contraseña son requeridos");
        }

        try {
            // CAMBIO: Ahora recibimos un objeto 'Usuario' (Entidad), no 'EventUsuario'
            Usuario usuarioEncontrado = usuarioService.loginUsuario(usuario, password);
            return ResponseEntity.ok(usuarioEncontrado);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @GetMapping("/all")
    // CAMBIO: Devolvemos una colección de 'Usuario'
    public ResponseEntity<Collection<Usuario>> obtenerTodosUsuarios() {
        Collection<Usuario> listaUsuarios = usuarioService.getAllUsuarios();
        return ResponseEntity.ok(listaUsuarios);
    }
}