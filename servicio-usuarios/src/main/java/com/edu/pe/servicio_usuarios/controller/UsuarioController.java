package com.edu.pe.servicio_usuarios.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
            return ResponseEntity.badRequest().body("El nombre de usuario no puede estar vacío");
        }
        if (password == null || password.isBlank()) {
            return ResponseEntity.badRequest().body("La contraseña no puede estar vacía");
        }
        if (correo == null || !correo.contains("@")) {
            return ResponseEntity.badRequest().body("Correo inválido");
        }
        if (rol == null || (!rol.equals("Recolector") && !rol.equals("Ciudadano"))) {
            return ResponseEntity.badRequest().body("El rol debe ser 'Recolector' o 'Ciudadano'");
        }

        String createID = "ECO-" + password;
        usuarioService.createUsuario(createID, usuario, password, correo, rol);

        return ResponseEntity.ok("Usuario Registrado: " + usuario);
    }

}
