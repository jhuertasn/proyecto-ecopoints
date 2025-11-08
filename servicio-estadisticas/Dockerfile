# servicio-estadisticas/Dockerfile

# --- Etapa 1: Construcción (Usando Maven) ---
# Usamos una imagen de Maven que incluye Java 17
FROM maven:3.8.5-eclipse-temurin-17 AS builder

# Establecemos el directorio de trabajo
WORKDIR /build

# Copiamos solo los archivos de dependencias y las descargamos
# Esto aprovecha el caché de Docker
COPY pom.xml .
COPY src ./src

# Construimos el .jar final
RUN mvn package -DskipTests

# --- Etapa 2: Ejecución (Usando solo Java Runtime) ---
# Usamos una imagen ligera que solo tiene Java 17 para correr
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copiamos el .jar construido desde la etapa anterior
COPY --from=builder /build/target/*.jar app.jar

# Exponemos el puerto de nuestra API
EXPOSE 3005

# El comando para iniciar el servicio
ENTRYPOINT ["java", "-jar", "app.jar"]