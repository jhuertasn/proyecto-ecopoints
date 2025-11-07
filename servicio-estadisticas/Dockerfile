# Dockerfile

# 1. Usamos una imagen base ligera de Node.js
FROM node:18-alpine

# 2. Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# 3. Copiamos el package.json para instalar dependencias
COPY package*.json ./

# 4. Ejecutamos npm install
RUN npm install

# 5. Copiamos el resto del código de nuestra aplicación
COPY . .

# 6. Exponemos el puerto que definimos en index.js
EXPOSE 3005

# 7. El comando para iniciar la aplicación cuando el contenedor arranque
CMD [ "node", "index.js" ]