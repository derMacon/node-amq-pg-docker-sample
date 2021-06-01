#pull base image
FROM openjdk:11-jre-slim-buster

#default command
CMD java -jar /data/jms-producer.jar

#copy jar to docker image
ADD ./target/jms-producer.jar /data/jms-producer.jar