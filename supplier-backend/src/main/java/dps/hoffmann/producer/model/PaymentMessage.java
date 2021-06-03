package dps.hoffmann.producer.model;

import lombok.Value;

import java.io.Serializable;
import java.sql.Timestamp;

@Value
public class PaymentMessage implements Serializable {
    private final String content;
    private final String xPath;
    private final Timestamp sentTimestamp;
}
