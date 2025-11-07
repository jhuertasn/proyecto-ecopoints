# 🌿 EcoPoints - Frontend del Proyecto

¡Bienvenido al frontend del proyecto EcoPoints! Esta aplicación ha sido desarrollada con React y Vite, y tiene como objetivo principal servir como la interfaz de usuario para la plataforma de reciclaje, puntos verdes y recompensas.

---

## 📖 Sobre el Proyecto

EcoPoints ataca la problemática de la falta de incentivos y trazabilidad en el reciclaje en Perú. La solución es una aplicación web que permite a los ciudadanos encontrar puntos de reciclaje, registrar sus entregas y ganar recompensas por sus acciones, creando un ecosistema sostenible junto a recolectores y municipalidades.

---

## 🛠️ Tecnologías Utilizadas

Este proyecto fue construido con un conjunto de herramientas modernas para el desarrollo web:

* **Framework Principal:** React 18
* **Entorno de Desarrollo:** Vite
* **Enrutamiento:** React Router v6
* **Estilos:** Tailwind CSS
* **Componentes UI:** daisyUI
* **Mapas:** React-Leaflet & Leaflet
* **Gráficos y Estadísticas:** Recharts
* **Iconos:** Lucide-React
* **Animaciones:** Canvas-Confetti

---

## 🚀 Puesta en Marcha (Cómo ejecutar el proyecto)

Para levantar el proyecto en tu máquina local, sigue estos sencillos pasos:

1.  **Clonar el repositorio** (si aún no lo tienes):
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    ```

2.  **Navegar a la carpeta del proyecto**:
    ```bash
    cd ecopoints-frontend
    ```

3.  **Instalar las dependencias**:
    Este comando leerá el `package.json` e instalará todas las librerías necesarias.
    ```bash
    npm install
    ```

4.  **Ejecutar el servidor de desarrollo**:
    ```bash
    npm run dev
    ```

5.  **Abrir en el navegador**:
    Abre tu navegador y visita `http://localhost:5173`. ¡Deberías ver la página del Portal!

---

## 📂 Estructura del Proyecto

Para mantener el código organizado, seguimos la siguiente estructura de carpetas:

* `src/views/`: Aquí se encuentran los componentes que representan una **página completa** de la aplicación (ej. `LoginPage.jsx`, `MapaPuntosVerdes.jsx`, `Portal.jsx`).
* `src/components/`: Contiene **componentes pequeños y reutilizables** que se usan dentro de las vistas (ej. `NavbarCiudadano.jsx`, `RequestCard.jsx`, `RecompensaCard.jsx`).
* `src/assets/`: Almacena todos los **recursos estáticos** como imágenes y logos.

---

## ✅ Vistas Completadas (15/15)

Hemos implementado todas las vistas mínimas requeridas por el profesor.

-   [x] 1. Login
-   [x] 2. Registro ciudadano
-   [x] 3. Dashboard ciudadano
-   [x] 4. Dashboard recolector
-   [x] 5. Mapa de puntos verdes
-   [x] 6. Registro de entrega
-   [x] 7. **Confirmación de entrega**
-   [x] 8. Historial de entregas
-   [x] 9. Acumulación de puntos
-   [x] 10. Canje de recompensas (Lista de Recompensas)
-   [x] 11. Dashboard municipalidad
-   [x] 12. Reporte de entregas
-   [x] 13. Estadísticas de reciclaje
-   [x] 14. **Gestión de puntos verdes** (Placeholder)
-   [x] 15. **Notificaciones de campañas** (Placeholder)

---




# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
