package dps.hoffmann.jmsproducer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class PublicsectorProducerApplication {

	public static void main(String[] args) {
		SpringApplication.run(PublicsectorProducerApplication.class, args);
	}

}
