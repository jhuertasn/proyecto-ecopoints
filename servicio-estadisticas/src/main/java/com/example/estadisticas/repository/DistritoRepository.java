package com.example.estadisticas.repository;

import com.example.estadisticas.model.EstadisticaDistrito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DistritoRepository extends JpaRepository<EstadisticaDistrito, String> {
}