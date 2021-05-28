package dps.hoffmann.jmsproducer.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MapperConfig {

    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }

}
