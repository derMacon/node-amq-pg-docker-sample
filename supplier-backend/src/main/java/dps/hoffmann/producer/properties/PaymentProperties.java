package dps.hoffmann.producer.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Map;

@Getter
@Setter
@Component
public class PaymentProperties {

    @Value("#{${payment.xpaths}}")
    private Map<String, String> xpaths;

    @Value("${payment.xmlpath}")
    private String xmlpath;

}
