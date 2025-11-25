package com.edu.pe.puntos_verdes.Controller;

import com.edu.pe.puntos_verdes.Model.PuntoVerde;
import com.edu.pe.puntos_verdes.Repository.PuntoVerdeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/puntos-verdes")
@CrossOrigin(origins = "*") // ¡Importante para evitar bloqueos!
public class PuntoVerdeController {

    @Autowired
    private PuntoVerdeRepository repository;

    // GET: Devuelve todos los puntos para el mapa
    @GetMapping
    public List<PuntoVerde> listarPuntos() {
        return repository.findAll();
    }
    
    // POST: Para crear (ya lo tenías, solo adáptalo)
    @PostMapping
    public PuntoVerde crearPunto(@RequestBody PuntoVerde punto) {
        return repository.save(punto);
    }
}