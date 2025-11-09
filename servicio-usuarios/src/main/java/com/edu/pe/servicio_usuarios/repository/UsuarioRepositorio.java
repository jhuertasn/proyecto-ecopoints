package com.edu.pe.servicio_usuarios.repository;

import java.nio.charset.StandardCharsets;
import java.util.Collection;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Repository;
import com.edu.pe.servicio_usuarios.event.EventUsuario;
import jakarta.annotation.PostConstruct;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Repository
public class UsuarioRepositorio {

    private final Map<String, EventUsuario> listaDeUsuariosEnMemoria = new ConcurrentHashMap<>();

    @PostConstruct
    public void init() {
        String usuario = "admin";
        String contraseña = "admin123";
        String correo = "admin@gmail.com";
        String rol = "Ciudadano";
        String hashedPassword = hashPassword(contraseña);
        EventUsuario admin = new EventUsuario(generateId(), usuario, hashedPassword, correo, rol);
        listaDeUsuariosEnMemoria.put(admin.getUsuario(), admin);
    }

    public static String hashPassword(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(password.getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hashBytes) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1)
                    hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error al generar hash", e);
        }
    }

    public EventUsuario save(EventUsuario usuario) {
        // Hashear la contraseña antes de guardar
        String hashedPassword = hashPassword(usuario.getPassword());
        EventUsuario usuarioConHash = new EventUsuario(
                usuario.getId(),
                usuario.getUsuario(),
                hashedPassword,
                usuario.getCorreo(),
                usuario.getRol());
        listaDeUsuariosEnMemoria.put(usuarioConHash.getUsuario(), usuarioConHash);
        return usuarioConHash;
    }

    public Optional<EventUsuario> findByUsuario(String nombreUsuario) {
        return Optional.ofNullable(listaDeUsuariosEnMemoria.get(nombreUsuario));
    }

    public Collection<EventUsuario> findAll() {
        return listaDeUsuariosEnMemoria.values();
    }

    public boolean existsByUsuario(String nombreUsuario) {
        return listaDeUsuariosEnMemoria.containsKey(nombreUsuario);
    }

    private String generateId() {
        return "ECO-"+java.util.UUID.randomUUID().toString();
    }
}
