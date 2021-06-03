#pull base image
FROM openjdk:11-jre-slim-buster

#default command
CMD java -jar /data/publicsector-producer.jar

#copy jar to docker image
ADD ./target/publicsector-producer.jar /data/publicsector-producer.jar
