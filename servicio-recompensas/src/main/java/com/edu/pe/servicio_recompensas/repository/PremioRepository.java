package com.edu.pe.servicio_recompensas.repository;

import com.edu.pe.servicio_recompensas.model.Premio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PremioRepository extends JpaRepository<Premio, String> {
    // Métodos CRUD básicos ya incluidos
}