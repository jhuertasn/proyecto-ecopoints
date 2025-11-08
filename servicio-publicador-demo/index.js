// servicio-publicador-demo/index.js
import express from 'express';
import amqp from 'amqplib';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const RABBITMQ_URL = 'amqp://rabbitmq';
let canal; // Guardaremos el canal de RabbitMQ aquí

// Función para conectar a RabbitMQ
async function conectarARabbitMQ() {
  try {
    const conexion = await amqp.connect(RABBITMQ_URL);
    canal = await conexion.createChannel();
    const exchange = 'eventos_entregas';
    await canal.assertExchange(exchange, 'fanout', { durable: false });
    console.log('[Publicador] Conectado a RabbitMQ y exchange asegurado.');
  } catch (error) {
    console.error(`[Publicador] Error al conectar con RabbitMQ: ${error.message}`);
    setTimeout(conectarARabbitMQ, 5000); // Reintentar
  }
}

// El único endpoint de este servicio
app.post('/publicar-evento', (req, res) => {
  if (!canal) {
    return res.status(500).send('Servicio no listo, RabbitMQ no conectado.');
  }

  const evento = req.body; // Recibe el JSON: { "material": "...", "peso": ... }
  const exchange = 'eventos_entregas';

  // Publica el mensaje al exchange
  canal.publish(exchange, '', Buffer.from(JSON.stringify(evento)), { 
  contentType: 'application/json' 
});

  console.log(`[Publicador] Evento publicado: ${JSON.stringify(evento)}`);
  res.status(202).send({ message: 'Evento publicado exitosamente' });
});

// Iniciar el servidor
const PORT = 3006; // Un puerto diferente
app.listen(PORT, () => {
  console.log(`[Publicador] Microservicio publicador corriendo en http://localhost:${PORT}`);
  conectarARabbitMQ();
});