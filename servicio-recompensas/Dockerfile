# ------------------------------------
# FASE 1: COMPILACIÓN (BUILD)
# ------------------------------------
FROM maven:3.9-eclipse-temurin-17 AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia solo el archivo de configuración (pom.xml) primero para aprovechar el caché de Docker
COPY pom.xml .

# Descarga las dependencias primero. Si pom.xml no cambia, Docker no re-descarga.
# **IMPORTANTE: Se agrega -Dmaven.wagon.http.pool=false para solucionar el error de red.**
RUN mvn dependency:go-offline -B -Dmaven.wagon.http.pool=false

# Copia el resto del código fuente
COPY src /app/src

# Compila el proyecto y genera el JAR
RUN mvn clean package -DskipTests -Dmaven.wagon.http.pool=false


# ------------------------------------
# FASE 2: EJECUCIÓN (RUNTIME)
# ------------------------------------
# Utiliza una imagen base ligera solo con el JRE para el entorno de producción
FROM eclipse-temurin:17-jre-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Expose el puerto del microservicio (ajustado al puerto 8080 si usas la configuración por defecto)
# El puerto 3004 que tenías es válido si lo configuraste manualmente en application.properties.
EXPOSE 3004

# Copia el JAR generado en la etapa de compilación
COPY --from=build /app/target/*.jar app.jar

# Comando para ejecutar la aplicación
ENTRYPOINT ["java","-jar","/app/app.jar"]