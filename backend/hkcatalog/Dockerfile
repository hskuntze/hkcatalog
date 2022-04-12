FROM openjdk:11
VOLUME /tmp
EXPOSE 8080
ADD ./target/hkcatalog-0.0.1-SNAPSHOT.jar hkcatalog.jar
ENTRYPOINT ["java","-jar","/hkcatalog.jar"]