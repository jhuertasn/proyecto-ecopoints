// index.js
import express from 'express';
import amqp from 'amqplib';
import cors from 'cors';

const app = express();
app.use(cors()); // Permite que el frontend de React llame a esta API
app.use(express.json());

// --- Nuestro "Almacén" de Datos (Base de Datos Falsa para la demo) ---
// En un proyecto real, esto estaría en una base de datos SQL o NoSQL.
let estadisticas = {
  total_entregas: 0,
  total_kg_reciclados: 0,
  materiales_kg: {
    plastico: 0,
    vidrio: 0,
    papel: 0,
    otro: 0
  }
};

// --- LÓGICA DE NEGOCIO ---
// Esta es la función clave. Será llamada por RabbitMQ (Plan A) o por nuestra API de simulación (Plan B).
function procesarEventoEntrega(datosEvento) {
  console.log('[Estadísticas] Recibido evento de entrega:', datosEvento);
  
  const { material, peso } = datosEvento;
  const pesoNum = parseFloat(peso) || 0;

  estadisticas.total_entregas += 1;
  estadisticas.total_kg_reciclados += pesoNum;

  // Actualiza el material específico
  if (estadisticas.materiales_kg.hasOwnProperty(material)) {
    estadisticas.materiales_kg[material] += pesoNum;
  } else {
    estadisticas.materiales_kg['otro'] += pesoNum;
  }
}

// --- API PARA EL FRONTEND ---
// El Dashboard de Municipalidad llamará a este endpoint para obtener los gráficos.
app.get('/estadisticas/globales', (req, res) => {
  console.log('[Estadísticas] Sirviendo datos de estadísticas...');
  res.json(estadisticas);
});

// --- API DE SIMULACIÓN (PLAN B) ---
// Esta es tu arma secreta para la presentación.
// Puedes llamarla con Postman para simular un evento del "servicio-entregas".
app.post('/simular-evento/entrega-validada', (req, res) => {
  console.log('[Estadísticas] ¡Evento SIMULADO recibido!');
  // El body de este POST debe ser el JSON del evento, ej: { "material": "plastico", "peso": 10 }
  procesarEventoEntrega(req.body);
  res.status(200).send({ message: 'Evento simulado procesado', nuevasEstadisticas: estadisticas });
});

// --- LÓGICA DE RABBITMQ (PLAN A) ---
const RABBITMQ_URL = 'amqp://rabbitmq'; // 'rabbitmq' es el nombre del servicio en Docker Compose

async function conectarARabbitMQ() {
  try {
    const conexion = await amqp.connect(RABBITMQ_URL);
    const canal = await conexion.createChannel();
    
    const exchange = 'eventos_entregas';
    await canal.assertExchange(exchange, 'fanout', { durable: false });

    // Crea una cola anónima y la enlaza al exchange
    const q = await canal.assertQueue('', { exclusive: true });
    console.log(`[Estadísticas] Esperando mensajes en cola ${q.queue}`);
    canal.bindQueue(q.queue, exchange, '');

    // Consume mensajes de la cola
    canal.consume(q.queue, (msg) => {
      if (msg.content) {
        console.log(`[Estadísticas] Mensaje de RabbitMQ recibido: ${msg.content.toString()}`);
        const datosEvento = JSON.parse(msg.content.toString());
        procesarEventoEntrega(datosEvento);
      }
    }, { noAck: true });

  } catch (error) {
    console.error(`[Estadísticas] Error al conectar con RabbitMQ: ${error.message}`);
    console.log('[Estadísticas] Reintentando conexión en 5 segundos...');
    // Reintenta la conexión si falla (clave en microservicios)
    setTimeout(conectarARabbitMQ, 5000);
  }
}

// --- Iniciar el Servidor ---
const PORT = 3005; // Usaremos un puerto único para este servicio
app.listen(PORT, () => {
  console.log(`[Estadísticas] Microservicio de Estadísticas corriendo en http://localhost:${PORT}`);
  // Intenta conectarse a RabbitMQ al iniciar
  conectarARabbitMQ();
});