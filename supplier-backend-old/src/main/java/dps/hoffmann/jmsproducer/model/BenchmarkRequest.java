package dps.hoffmann.jmsproducer.model;

import lombok.Value;

@Value
public class BenchmarkRequest {
    private String pathOption;
    private String paymentOption;
    private int messageCnt;
    private int duration;
}
