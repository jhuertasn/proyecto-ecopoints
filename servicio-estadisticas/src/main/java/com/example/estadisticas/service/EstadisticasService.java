package com.example.estadisticas.service;

import com.example.estadisticas.model.EstadisticaGlobal;
import com.example.estadisticas.model.EstadisticaMaterial;
import com.example.estadisticas.repository.GlobalRepository;
import com.example.estadisticas.repository.MaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EstadisticasService {

    @Autowired
    private GlobalRepository globalRepository;
    @Autowired
    private MaterialRepository materialRepository;

    // --- LÓGICA PARA PROCESAR EL EVENTO DE RABBITMQ ---
    @Transactional
    public void procesarNuevaEntrega(String material, Double peso) {
        // 1. Actualizar Globales (si no existe, se crea)
        EstadisticaGlobal global = globalRepository.findById(1L)
                .orElse(new EstadisticaGlobal(1L, 0, 0.0));
        
        global.setTotalEntregas(global.getTotalEntregas() + 1);
        global.setTotalKgReciclados(global.getTotalKgReciclados() + peso);
        globalRepository.save(global);

        // 2. Actualizar Material Específico (si no existe, se crea)
        // Normalizamos a minúsculas para evitar duplicados como "Vidrio" y "vidrio"
        String materialKey = material.toLowerCase();
        EstadisticaMaterial estMaterial = materialRepository.findById(materialKey)
                .orElse(new EstadisticaMaterial(materialKey, 0.0));
        
        estMaterial.setTotalKg(estMaterial.getTotalKg() + peso);
        materialRepository.save(estMaterial);

        System.out.println("✅ [MySQL] Estadísticas actualizadas. Total global: " + global.getTotalKgReciclados());
    }

    // --- LÓGICA PARA PREPARAR EL JSON DEL FRONTEND ---
    public Map<String, Object> obtenerDatosDashboard() {
        EstadisticaGlobal global = globalRepository.findById(1L)
                .orElse(new EstadisticaGlobal(1L, 0, 0.0));
        
        List<EstadisticaMaterial> materiales = materialRepository.findAll();

        // Convertimos la lista de materiales a un Mapa simple para el JSON
        Map<String, Double> mapaMateriales = new HashMap<>();
        // Valores por defecto
        mapaMateriales.put("plastico", 0.0);
        mapaMateriales.put("vidrio", 0.0);
        mapaMateriales.put("papel", 0.0);
        mapaMateriales.put("otro", 0.0);

        // Llenamos con datos reales
        for (EstadisticaMaterial m : materiales) {
            mapaMateriales.put(m.getMaterial(), m.getTotalKg());
        }

        // Construimos la respuesta final
        return Map.of(
            "total_entregas", global.getTotalEntregas(),
            "total_kg_reciclados", global.getTotalKgReciclados(),
            "materiales_kg", mapaMateriales
        );
    }
}