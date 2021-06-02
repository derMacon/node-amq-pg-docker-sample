package dps.hoffmann.jmsproducer.model;

import lombok.Value;

@Value
public class Payment {
    private String paymentName;
    private String xmlContent;
}
