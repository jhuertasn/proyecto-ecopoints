package com.example.estadisticas.service;

import com.example.estadisticas.model.EstadisticaDistrito;
import com.example.estadisticas.model.EstadisticaGlobal;
import com.example.estadisticas.model.EstadisticaMaterial;
import com.example.estadisticas.repository.DistritoRepository;
import com.example.estadisticas.repository.GlobalRepository;
import com.example.estadisticas.repository.MaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import jakarta.annotation.PostConstruct; // <--- 1. IMPORTANTE

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EstadisticasService {

    @Autowired
    private GlobalRepository globalRepository;
    @Autowired
    private MaterialRepository materialRepository;
    @Autowired
    private DistritoRepository distritoRepository;

    // --- 2. INICIALIZADOR DE DATOS (LO QUE FALTABA) ---
    @PostConstruct
    public void init() {
        // A. Asegurar que existe la fila global ID=1
        if (!globalRepository.existsById(1L)) {
            globalRepository.save(new EstadisticaGlobal(1L, 0, 0.0));
            System.out.println("📊 [MySQL] Inicializada tabla estadísticas globales.");
        }

        // B. Asegurar que existen los materiales base en la BD
        List<String> materialesBase = List.of("plastico", "vidrio", "papel", "carton", "metal", "otro");
        for (String mat : materialesBase) {
            if (!materialRepository.existsById(mat)) {
                materialRepository.save(new EstadisticaMaterial(mat, 0.0));
            }
        }
        System.out.println("📊 [MySQL] Inicializada tabla materiales.");
    }

    // --- LÓGICA PARA PROCESAR EL EVENTO DE RABBITMQ ---
    @Transactional
    public void procesarNuevaEntrega(String material, Double peso, String distrito) {
        // 1. Actualizar Globales
        EstadisticaGlobal global = globalRepository.findById(1L)
                .orElse(new EstadisticaGlobal(1L, 0, 0.0));
        
        global.setTotalEntregas(global.getTotalEntregas() + 1);
        global.setTotalKgReciclados(global.getTotalKgReciclados() + peso);
        globalRepository.save(global);

        // 2. Actualizar Material Específico
        String materialKey = (material != null) ? material.toLowerCase() : "otro";
        EstadisticaMaterial estMaterial = materialRepository.findById(materialKey)
                .orElse(new EstadisticaMaterial(materialKey, 0.0));
        
        estMaterial.setTotalKg(estMaterial.getTotalKg() + peso);
        materialRepository.save(estMaterial);

        // 3. Actualizar Distrito
        if (distrito != null && !distrito.isEmpty()) {
            String distKey = distrito.toLowerCase();
            EstadisticaDistrito estDistrito = distritoRepository.findById(distKey)
                    .orElse(new EstadisticaDistrito(distKey, 0));
            
            // Si es null (nuevo registro), iniciamos en 0
            if (estDistrito.getTotalEntregas() == null) estDistrito.setTotalEntregas(0);

            estDistrito.setTotalEntregas(estDistrito.getTotalEntregas() + 1);
            distritoRepository.save(estDistrito);
        }

        System.out.println("✅ [MySQL] Estadísticas actualizadas. Total global: " + global.getTotalKgReciclados());
    }

    // --- LÓGICA PARA PREPARAR EL JSON DEL FRONTEND ---
    public Map<String, Object> obtenerDatosDashboard() {
        EstadisticaGlobal global = globalRepository.findById(1L)
                .orElse(new EstadisticaGlobal(1L, 0, 0.0));
        
        List<EstadisticaMaterial> materiales = materialRepository.findAll();
        List<EstadisticaDistrito> distritos = distritoRepository.findAll();

        // Convertimos la lista de materiales a un Mapa simple
        Map<String, Double> mapaMateriales = new HashMap<>();
        // Valores por defecto para que el frontend no falle si la BD está vacía
        mapaMateriales.put("plastico", 0.0);
        mapaMateriales.put("vidrio", 0.0);
        mapaMateriales.put("papel", 0.0);
        mapaMateriales.put("otro", 0.0);

        for (EstadisticaMaterial m : materiales) {
            mapaMateriales.put(m.getMaterial(), m.getTotalKg());
        }

        // Mapeamos distritos
        Map<String, Integer> mapaDistritos = new HashMap<>();
        for (EstadisticaDistrito d : distritos) {
            mapaDistritos.put(d.getDistrito(), d.getTotalEntregas());
        }

        return Map.of(
            "total_entregas", global.getTotalEntregas(),
            "total_kg_reciclados", global.getTotalKgReciclados(),
            "materiales_kg", mapaMateriales,
            "distritos", mapaDistritos
        );
    }
}