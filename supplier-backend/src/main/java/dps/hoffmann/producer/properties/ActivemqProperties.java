package dps.hoffmann.producer.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@ConfigurationProperties(ignoreUnknownFields = false, prefix = "broker.activemq")
public class ActivemqProperties {
    private String url;
    private String queue;
    private String topic;
}
