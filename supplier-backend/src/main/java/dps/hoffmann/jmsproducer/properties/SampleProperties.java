package dps.hoffmann.jmsproducer.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@ConfigurationProperties(ignoreUnknownFields = false, prefix = "sample")
public class SampleProperties {
    private String xmlres;
    private String xsdres;
    private String specificationName;
    private String xPath;
}
