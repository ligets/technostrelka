FROM eclipse-temurin:17-jdk-jammy AS builder

RUN apt update && apt install -y maven

WORKDIR /java
COPY . /java

RUN mvn package -Dmaven.test.skip=true

FROM eclipse-temurin:17-jdk-jammy

COPY --from=builder /java/target/Accounts-0.0.1-SNAPSHOT.jar Accounts-0.0.1-SNAPSHOT.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "Accounts-0.0.1-SNAPSHOT.jar"]
