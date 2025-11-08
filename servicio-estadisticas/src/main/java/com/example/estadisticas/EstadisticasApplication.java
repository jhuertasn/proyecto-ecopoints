// Renombra este archivo a EstadisticasApplication.java
// La ruta será: src/main/java/com/example/demo/EstadisticasApplication.java

package com.example.estadisticas;

import lombok.Data;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@SpringBootApplication
public class EstadisticasApplication {

    public static void main(String[] args) {
        SpringApplication.run(EstadisticasApplication.class, args);
    }
}

// --- NUESTRA "BASE DE DATOS" EN MEMORIA ---
// Usamos un Componente (Singleton) para guardar los datos
@Component
class AlmacenEstadisticas {
    private final Map<String, Double> materiales_kg = new ConcurrentHashMap<>();
    private int total_entregas = 0;
    private double total_kg_reciclados = 0.0;

    public AlmacenEstadisticas() {
        // Inicializamos los materiales
        materiales_kg.put("plastico", 0.0);
        materiales_kg.put("vidrio", 0.0);
        materiales_kg.put("papel", 0.0);
        materiales_kg.put("otro", 0.0);
    }

    // --- LÓGICA DE NEGOCIO ---
    // Esta es la función clave
    public synchronized void procesarEventoEntrega(EventoEntrega evento) {
        System.out.println("[Estadísticas] Procesando evento: " + evento);

        double peso = evento.getPeso();
        String material = evento.getMaterial();

        total_entregas++;
        total_kg_reciclados += peso;

        materiales_kg.merge(material, peso, Double::sum);
    }

    // Método para obtener el estado actual
    public synchronized Map<String, Object> getEstadisticasActuales() {
        return Map.of(
            "total_entregas", total_entregas,
            "total_kg_reciclados", total_kg_reciclados,
            "materiales_kg", Map.copyOf(materiales_kg)
        );
    }
}

// --- API REST CONTROLLER (Endpoints para el Frontend y Postman) ---
@RestController
class EstadisticasController {

    private final AlmacenEstadisticas almacen;

    // Spring inyecta la dependencia automáticamente
    public EstadisticasController(AlmacenEstadisticas almacen) {
        this.almacen = almacen;
    }

    // API PARA EL FRONTEND (Tu Dashboard la usará)
    @GetMapping("/estadisticas/globales")
    public Map<String, Object> getEstadisticasGlobales() {
        System.out.println("[Estadísticas] Sirviendo datos de estadísticas...");
        return almacen.getEstadisticasActuales();
    }

    // API DE SIMULACIÓN (PLAN B para tu demo)
    @PostMapping("/simular-evento/entrega-validada")
    public ResponseEntity<Map<String, Object>> simularEvento(@RequestBody EventoEntrega evento) {
        System.out.println("[Estadísticas] ¡Evento SIMULADO recibido!");
        almacen.procesarEventoEntrega(evento);
        return ResponseEntity.ok(almacen.getEstadisticasActuales());
    }
}

// --- CONSUMIDOR DE RABBITMQ (Plan A) ---
@Component
class ConsumidorRabbitMQ {

    private final AlmacenEstadisticas almacen;

    public ConsumidorRabbitMQ(AlmacenEstadisticas almacen) {
        this.almacen = almacen;
    }

    // ¡Esta es la magia! Spring escuchará automáticamente a la cola.
    @RabbitListener(queues = "cola.estadisticas") // Nombraremos la cola así
    public void manejarMensaje(EventoEntrega evento) {
        System.out.println("[Estadísticas] Mensaje de RabbitMQ recibido: " + evento);
        almacen.procesarEventoEntrega(evento);
    }
}

// --- Objeto de Datos (DTO) ---
// Esto define la estructura del JSON que esperamos recibir
// Lombok @Data crea getters, setters, toString, etc. automáticamente.
@Data
class EventoEntrega {
    private String material;
    private double peso;
}