package com.edu.pe.servicio_recompensas.repository;

import com.edu.pe.servicio_recompensas.model.Canje;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CanjeRepository extends JpaRepository<Canje, String> {
    // Método para buscar canjes por usuario
    List<Canje> findByUsuarioId(String usuarioId);
}