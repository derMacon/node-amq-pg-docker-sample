package dps.hoffmann.producer.service;

import dps.hoffmann.producer.properties.PaymentProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static dps.hoffmann.producer.utils.ResourceUtils.readResource;

@Service
public class PaymentGenerator {

    @Autowired
    private PaymentProperties paymentProperties;

    public String nextRandom() {
        // todo modify
        return readResource(getClass(), paymentProperties.getXmlres());
    }

    public String nextSample() {
        return readResource(getClass(), paymentProperties.getXmlres());
    }

}
