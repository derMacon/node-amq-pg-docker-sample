package dps.hoffmann.jmsproducer.model;

import lombok.Value;

import java.io.Serializable;
import java.sql.Timestamp;

@Value
public class PaymentMessage implements Serializable {
    private final String content;
    private final String specificationName;
    private final Timestamp sentTimestamp;
}
