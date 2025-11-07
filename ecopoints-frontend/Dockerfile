# Dockerfile para el Frontend (ecopoints-frontend)

# --- Etapa 1: Construcción (Build) ---
# Usamos una imagen de Node para construir el proyecto
FROM node:18-alpine AS builder
WORKDIR /app

# Copiamos package.json e instalamos dependencias
COPY package*.json ./
RUN npm install

# Copiamos el resto del código y construimos el proyecto
COPY . .
RUN npm run build

# --- Etapa 2: Servidor (Serve) ---
# Usamos una imagen de Nginx (un servidor web ligero) para servir los archivos
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Borramos el contenido por defecto de Nginx
RUN rm -rf ./*

# Copiamos los archivos construidos (de la carpeta 'dist') desde la etapa anterior
COPY --from=builder /app/dist .

# Le decimos a Nginx que sirva nuestro index.html
ENTRYPOINT ["nginx", "-g", "daemon off;"]