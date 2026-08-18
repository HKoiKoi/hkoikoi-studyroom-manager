# 1단계: 빌드 환경
FROM eclipse-temurin:25-jdk-alpine AS builder
WORKDIR /app
COPY . .
RUN chmod +x ./gradlew
RUN ./gradlew build -x test

# 2단계: 실행 환경
FROM eclipse-temurin:25-jre-alpine
WORKDIR /app
ENV TZ=Asia/Seoul
COPY --from=builder /app/build/libs/*SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
