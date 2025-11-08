package com.edu.pe.puntos_verdes.Controller;

import com.edu.pe.puntos_verdes.Model.PuntoVerdeDTO;
import com.edu.pe.puntos_verdes.Service.PuntoVerdeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/puntos-verdes")
public class PuntoVerdeController {

    private final PuntoVerdeService service;

    public PuntoVerdeController(PuntoVerdeService service) {
        this.service = service;
    }

    @GetMapping
    public List<PuntoVerdeDTO> obtenerTodos() {
        return service.obtenerPuntos();
    }

    @PostMapping
    public ResponseEntity<String> crear(@RequestBody PuntoVerdeDTO dto) {
        service.crearPunto(dto);
        return ResponseEntity.ok("Punto Verde creado correctamente.");
    }
}
