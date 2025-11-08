# ============================
#   STAGE 1: Construcción
# ============================
FROM maven:3.9.6-eclipse-temurin-17 AS build

# Carpeta de trabajo
WORKDIR /app

# Copiar pom.xml y descargar dependencias offline
COPY pom.xml ./
RUN mvn -B dependency:go-offline

# Copiar todo el código fuente
COPY src ./src

# Construir el .jar final sin tests
RUN mvn -B clean package -DskipTests

# ============================
#   STAGE 2: Imagen final
# ============================
FROM eclipse-temurin:17-jre

# Carpeta de trabajo
WORKDIR /app

# Copiar el JAR generado
COPY --from=build /app/target/*.jar app.jar

# Puerto donde escucha Spring Boot
EXPOSE 3007

# Comando de ejecución
ENTRYPOINT ["java", "-jar", "app.jar"]
