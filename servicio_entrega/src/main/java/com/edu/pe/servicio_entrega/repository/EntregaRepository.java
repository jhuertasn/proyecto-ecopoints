package com.edu.pe.servicio_entrega.repository;

import com.edu.pe.servicio_entrega.model.Entrega;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EntregaRepository extends JpaRepository<Entrega, String> {
// 1. Busca todas las entregas que tengan un estado específico
    // Se usará para listar las "PENDIENTE"
    List<Entrega> findByEstado(String estado);

    // 2. Busca todas las entregas de un usuario específico
    // IMPORTANTE: Asegúrate de que en tu modelo Entrega el campo se llame 'usuarioId'
    // Si en tu modelo es 'usuarioId', este es el nombre correcto.
    List<Entrega> findByUsuarioId(String usuarioId);
    
}