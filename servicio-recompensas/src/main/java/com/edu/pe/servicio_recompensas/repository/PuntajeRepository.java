package com.edu.pe.servicio_recompensas.repository;

import com.edu.pe.servicio_recompensas.model.Puntaje;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PuntajeRepository extends JpaRepository<Puntaje, String> {
    // Métodos CRUD básicos ya incluidos
}