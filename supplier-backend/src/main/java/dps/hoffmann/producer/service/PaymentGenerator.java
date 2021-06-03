package dps.hoffmann.producer.service;

import dps.hoffmann.producer.properties.OldPaymentProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static dps.hoffmann.producer.utils.ResourceUtils.readResource;

@Service
public class PaymentGenerator {

    @Autowired
    private OldPaymentProperties oldPaymentProperties;

    public String nextRandom() {
        // todo modify
        return readResource(getClass(), oldPaymentProperties.getXmlres());
    }

    public String nextSample() {
        return readResource(getClass(), oldPaymentProperties.getXmlres());
    }

}
