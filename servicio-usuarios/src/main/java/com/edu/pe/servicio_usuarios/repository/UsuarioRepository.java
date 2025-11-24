package com.edu.pe.servicio_usuarios.repository;

import com.edu.pe.servicio_usuarios.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, String> {
    // JPA nos da automáticamente métodos como save(), findAll(), etc.
    Usuario findByUsuarioAndPassword(String usuario, String password);
}