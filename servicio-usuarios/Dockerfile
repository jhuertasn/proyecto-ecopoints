# ----- Etapa 1: Compilación (Build) -----
# Usamos una imagen que tenga el JDK (Java Development Kit) y Maven
# Usamos 'as builder' para nombrar esta etapa
FROM eclipse-temurin:17-jdk-jammy AS builder

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de definición del proyecto (Maven)
# Esto aprovecha la caché de capas de Docker:
# Si 'pom.xml' no cambia, no se volverán a descargar las dependencias.
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Descargamos todas las dependencias del proyecto
RUN ./mvnw dependency:go-offline

# Copiamos el resto del código fuente
COPY src ./src

# Compilamos la aplicación y empaquetamos el .jar
# -DskipTests omite las pruebas (buena práctica en build de Docker)
RUN ./mvnw package -DskipTests


# ----- Etapa 2: Ejecución (Run) -----
# Usamos una imagen ligera que SOLO tenga el JRE (Java Runtime Environment)
FROM eclipse-temurin:17-jre-jammy

WORKDIR /app

# Exponemos el puerto que usa Spring Boot por defecto
EXPOSE 9090

# Copiamos SOLO el .jar compilado desde la etapa 'builder'
# Esto hace que la imagen final sea muy pequeña
COPY --from=builder /app/target/*.jar app.jar

# Comando para ejecutar la aplicación cuando se inicie el contenedor
ENTRYPOINT ["java", "-jar", "app.jar"]