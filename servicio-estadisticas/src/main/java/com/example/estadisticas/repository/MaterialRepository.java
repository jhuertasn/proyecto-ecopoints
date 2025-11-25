package com.example.estadisticas.repository;

import com.example.estadisticas.model.EstadisticaMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaterialRepository extends JpaRepository<EstadisticaMaterial, String> {
}