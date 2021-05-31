package dps.hoffmann.jmsproducer.model;

import lombok.ToString;
import lombok.Value;

import java.io.Serializable;

@Value
@ToString
public class SpecificationWrapper implements Serializable {
    private String specificationName;
    private String xsdContent;
    private String xPath;
}
