# --- Etapa 1: El Constructor (Compilador) ---
# Usamos una imagen oficial de Maven con JDK 17 (definido en tu pom.xml)
FROM maven:3-eclipse-temurin-17 AS builder

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos solo el pom.xml para aprovechar el caché de Docker
# Si el pom.xml no cambia, Docker no volverá a descargar las dependencias
COPY pom.xml .

# Descargamos todas las dependencias
RUN mvn dependency:go-offline

# Copiamos el resto del código fuente
COPY src ./src

# Construimos el proyecto y creamos el archivo .jar
# -DskipTests omite la ejecución de tests (más rápido para builds)
RUN mvn clean package -DskipTests

# --- Etapa 2: El Ejecutor (Runtime) ---
# Usamos una imagen ligera, solo con el Java Runtime (JRE)
FROM eclipse-temurin:17-jre-jammy

# Establecemos el directorio de trabajo
WORKDIR /app

# Creamos un usuario no-root por seguridad
RUN useradd -m -s /bin/bash appuser
USER appuser

# Copiamos solo el .jar construido de la etapa anterior
# El 'servicio-entregas*.jar' encontrará el JAR sin importar la versión
COPY --from=builder /app/target/servicio-entregas*.jar app.jar

# Informamos a Docker que el contenedor usará el puerto 3009
EXPOSE 3009

# ¡IMPORTANTE! FORZAMOS a Spring Boot a usar el puerto 3009
# Esto sobreescribe el 'server.port=8082' de tu application.properties
# ENV SERVER_PORT=3009

# El comando para iniciar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]