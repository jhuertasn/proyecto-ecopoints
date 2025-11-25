package com.example.estadisticas.repository;

import com.example.estadisticas.model.EstadisticaGlobal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GlobalRepository extends JpaRepository<EstadisticaGlobal, Long> {
}