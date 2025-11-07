# 🌿 Proyecto EcoPoints - Avance de Arquitectura

¡Bienvenido al repositorio del proyecto EcoPoints! Este proyecto contiene el avance de la implementación de nuestra arquitectura de microservicios.

El objetivo de este avance es demostrar un **flujo de comunicación asíncrono** entre microservicios usando **Docker** y **RabbitMQ**, que sirva como base para el resto del desarrollo.

---

## 🏛️ Arquitectura de este Avance

Este repositorio está organizado como un monorepo con 4 componentes principales orquestados por Docker Compose:

1.  **`ecopoints-frontend`**: Nuestra aplicación en React, servida por un contenedor Nginx. (Puerto: `5173`)
2.  **`servicio-estadisticas`**: Microservicio "Consumidor" (Node.js/Express). Escucha eventos de RabbitMQ y expone una API con los datos. (Puerto: `3005`)
3.  **`servicio-publicador-demo`**: Microservicio "Publicador" (Node.js/Express). Simula a los otros servicios (ej. `servicio-entregas`) publicando eventos en RabbitMQ. (Puerto: `3006`)
4.  **`rabbitmq`**: El broker de mensajería que desacopla nuestros servicios. (Puertos: `5672` para AMQP, `15672` para la Interfaz Web)

---

## 🛠️ Prerrequisitos Indispensables

Para poder ejecutar este proyecto, CADA integrante del equipo necesita tener instalado y **corriendo** el siguiente software en su PC:

1.  **[Git](https://git-scm.com/downloads)**: Para clonar el repositorio.
2.  **[Docker Desktop](https://www.docker.com/products/docker-desktop/)**: **¡ESTE ES EL MÁS IMPORTANTE!** Docker manejará todas las dependencias, bases de datos y servidores de Node.js por nosotros. Asegúrate de que esté **abierto y ejecutándose** antes de empezar.
3.  **[Postman](https://www.postman.com/downloads/) (o similar)**: Para probar la API y simular los eventos.
4.  **Editor de Código** (como VS Code).

*(Nota: No necesitas instalar Node.js o npm en tu máquina local, ya que Docker se encarga de eso dentro de los contenedores. Sin embargo, se recomienda tenerlo para el autocompletado en tu editor).*

---

## 🚀 Guía de Instalación y Ejecución

Esta es la gran ventaja de Docker: la instalación es un solo comando.

1.  **Clonar el Repositorio**
    Abre tu terminal y clona el proyecto en la carpeta que prefieras.
    ```bash
    git clone [https://github.com/tu-usuario/proyecto-ecopoints.git](https://github.com/tu-usuario/proyecto-ecopoints.git)
    ```

2.  **Abrir la Carpeta**
    Navega a la raíz del proyecto que acabas de clonar.
    ```bash
    cd proyecto-ecopoints
    ```

3.  **Verificar que Docker Desktop esté corriendo**
    Abre la aplicación Docker Desktop y asegúrate de que esté en estado "running" (generalmente con un ícono verde).

4.  **Levantar Todo el Sistema**
    Este es el único comando que necesitas. Construirá las "imágenes" de cada servicio (incluyendo el `npm install` interno) y los iniciará todos juntos.
    ```bash
    docker-compose up --build
    ```
    La primera vez que lo ejecutes, **tardará varios minutos** mientras descarga Node.js, Nginx y RabbitMQ. Las siguientes veces será casi instantáneo.

    Espera a que la terminal muestre los logs de los 4 servicios y se estabilice. Verás mensajes como `[Estadísticas] Esperando mensajes en cola...` y `[Publicador] Conectado a RabbitMQ...`.

---

## 🧪 Cómo Probar el Flujo (El Guion de la Demo)

Una vez que todo esté corriendo, sigue estos pasos para verificar que la arquitectura funciona:

1.  **Verifica los Contenedores:**
    * Abre **Docker Desktop** y verás los 4 contenedores (`frontend`, `rabbitmq`, `estadisticas`, `publicador`) con un punto verde, indicando que están corriendo.

2.  **Muestra la API en Cero (El "Antes"):**
    * Abre tu navegador web y visita: `http://localhost:3005/estadisticas/globales`
    * Verás los contadores en cero: `{"total_entregas":0, ...}`

3.  **Dispara el Evento (La "Acción"):**
    * Abre **Postman**.
    * Crea una nueva petición `POST` a la URL: `http://localhost:3006/publicar-evento`
    * Ve a la pestaña **Body** -> selecciona **raw** -> selecciona **JSON**.
    * Pega este JSON y presiona **Send**:
        ```json
        {
          "material": "papel",
          "peso": 15
        }
        ```

4.  **Muestra el Resultado (El "Después"):**
    * Vuelve a la pestaña del navegador del **Paso 2** (`http://localhost:3005/estadisticas/globales`).
    * **Refresca la página** (F5).
    * ¡Verás los datos actualizados! `{"total_entregas":1, "total_kg_reciclados":15, ...}`

5.  **(Bonus) Verifica el Frontend y RabbitMQ:**
    * **Frontend:** Visita `http://localhost:5173` para ver la aplicación de React.
    * **RabbitMQ:** Visita `http://localhost:15672` (Usuario: `guest`, Contraseña: `guest`) para ver la interfaz de gestión.

---
