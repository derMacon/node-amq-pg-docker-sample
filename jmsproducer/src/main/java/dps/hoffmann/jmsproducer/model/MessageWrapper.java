package dps.hoffmann.jmsproducer.model;

import lombok.Value;

import java.io.Serializable;

@Value
public class MessageWrapper implements Serializable {
    private final String message;
}
