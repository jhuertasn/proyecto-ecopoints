package com.edu.pe.puntos_verdes.Repository;

import com.edu.pe.puntos_verdes.Model.PuntoVerde;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PuntoVerdeRepository extends JpaRepository<PuntoVerde, Long> {
}