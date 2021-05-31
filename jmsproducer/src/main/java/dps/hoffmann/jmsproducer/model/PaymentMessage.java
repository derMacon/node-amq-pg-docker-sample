package dps.hoffmann.jmsproducer.model;

import lombok.Value;

import java.io.Serializable;
import java.sql.Timestamp;

@Value
public class PaymentMessage implements Serializable {
    private final String message;
    private final Timestamp sent;
}
