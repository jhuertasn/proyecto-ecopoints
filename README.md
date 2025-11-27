# 🌿 Proyecto EcoPoints - Plataforma Integral de Reciclaje

¡Bienvenido al repositorio oficial de **EcoPoints**! Este proyecto implementa una arquitectura de microservicios para gestionar el ciclo de vida del reciclaje, desde la entrega del ciudadano hasta la validación del recolector y la asignación de recompensas.

El sistema utiliza una arquitectura desacoplada y asíncrona (orientada a eventos) para garantizar la escalabilidad y el rendimiento en tiempo real.

---

## 🏛️ Arquitectura del Sistema

El proyecto se compone de **7 contenedores** principales orquestados con Docker Compose, más una conexión a base de datos local:

| Servicio | Tecnología | Puerto | Descripción |
| :--- | :--- | :--- | :--- |
| **Frontend** | React + Vite | `5173` | Interfaz de usuario para Ciudadanos, Recolectores y Municipalidad. |
| **Usuarios** | Spring Boot | `9090` | Gestión de autenticación, registro y roles. |
| **Puntos Verdes** | Spring Boot | `3007` | CRUD de puntos de acopio y geolocalización. |
| **Entregas** | Spring Boot | `3009` | **[Publicador]** Registra entregas y emite eventos a RabbitMQ al validar. |
| **Recompensas** | Spring Boot | `3004` | **[Consumidor]** Escucha eventos, calcula puntos y gestiona canjes. |
| **Estadísticas** | Spring Boot | `3005` | **[Consumidor]** Escucha eventos y actualiza métricas municipales en tiempo real. |
| **RabbitMQ** | Message Broker | `5672` | Bus de mensajería para comunicación asíncrona. |
| **MySQL** | Base de Datos | `3306` | **Corriendo en Local** (Host) y accedida desde Docker. |

---

## 🛠️ Prerrequisitos

Para ejecutar este proyecto, necesitas tener instalado:

1.  **[Git](https://git-scm.com/downloads)**
2.  **[Docker Desktop](https://www.docker.com/products/docker-desktop/)** (Debe estar corriendo).
3.  **[Node.js](https://nodejs.org/)** (Para ejecutar el frontend localmente).
4.  **MySQL Server** (Instalado en tu máquina local, ej: Workbench, XAMPP o MySQL Installer).

---

## ⚙️ Configuración de Base de Datos (¡IMPORTANTE!)

Los microservicios están configurados para conectarse a tu **MySQL Local** usando `host.docker.internal`. Antes de iniciar, debes preparar la base de datos:

1.  Abre tu gestor de base de datos (Workbench, HeidiSQL, etc.).
2.  Ejecuta este script SQL para crear la base de datos vacía:
    ```sql
    CREATE DATABASE IF NOT EXISTS ecopoints_db;
    ```
3.  **Credenciales:** El proyecto está configurado por defecto para usar:
    * **Usuario:** `root`
    * **Contraseña:** `Malo12345`
    * *Si tu contraseña local es diferente, debes cambiarla en los archivos `application.properties` de cada microservicio dentro de la carpeta `src/main/resources`.*

---

## 🚀 Guía de Instalación y Ejecución

Sigue estos pasos para levantar todo el entorno de desarrollo.

### 1. Clonar el Repositorio
```bash
git clone https://github.com/jhuertasn/proyecto-ecopoints.git
cd proyecto-ecopoints
```
### 2. Levantar el Backend (Docker)

Este comando construirá las imágenes de los 5 microservicios y descargará RabbitMQ.
```bash
docker-compose up --build
``` 
### 3. Levantar el Frontend (Local)

Para tener una experiencia de desarrollo fluida, correremos React en la terminal local.

Abre una segunda terminal, entra a la carpeta del frontend e instala dependencias:
```bash
cd ecopoints-frontend
npm install
npm run dev
```
Accede a la aplicación en: http://localhost:5173 o http://localhost:5174 si el anterior puerto esta ocupado


### 4. Flujo de Pruebas (Demo Completa)

Para verificar que todo funciona, realiza este recorrido:

1. Registro (Ciudadano):

Ve a Regístrate. Crea un usuario (ej: JuanPerez, Rol: Ciudadano).

Verificación: El usuario se guarda en MySQL.

2. Gestión (Municipalidad - Opcional):

Crea un usuario con rol Municipalidad. Inicia sesión.

Ve a Gestión de Puntos y crea un nuevo punto verde.

3. Reciclaje (Ciudadano):

Inicia sesión como JuanPerez.

Ve a Registrar Entrega. Selecciona un material y un punto verde.

Dale a "Registrar".

4. Validación (Recolector):

Crea/Inicia sesión con un usuario Recolector.

Ve a Gestión. Verás la entrega pendiente.

Haz clic en Validar.

¡Magia! Esto dispara el evento a RabbitMQ.

5. Resultados (Cierre del Ciclo):

Entra de nuevo como JuanPerez. Ve a Recompensas. ¡Tus puntos habrán subido!

Entra como Municipalidad. Ve al Dashboard. ¡Los gráficos de reciclaje se habrán actualizado en tiempo real!

📁 Estructura del Proyecto

proyecto-ecopoints/
├── docker-compose.yml       # Orquestador de todos los servicios
├── ecopoints-frontend/      # Cliente Web (React + Vite + Tailwind)
├── servicio-usuarios/       # Microservicio de Autenticación
├── servicio-puntos-verdes/  # Microservicio de Geo-localización
├── servicio-entrega/        # Microservicio Core (Publicador RabbitMQ)
├── servicio-recompensas/    # Microservicio Gamificación (Consumidor RabbitMQ)
└── servicio-estadisticas/   # Microservicio Data (Consumidor RabbitMQ)

