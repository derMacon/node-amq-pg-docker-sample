package dps.hoffmann.producer.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "sample.payment")
public class PaymentProperties {
    private String xmlres;
    private String paymentName;
}
