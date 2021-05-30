package dps.hoffmann.jmsproducer.model;

import lombok.Value;

import java.io.Serializable;

@Value
public class SpecificationWrapper implements Serializable {
    private String specificationName;
    private String xsdContent;
}
