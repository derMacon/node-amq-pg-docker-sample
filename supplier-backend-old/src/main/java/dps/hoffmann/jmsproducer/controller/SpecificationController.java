package dps.hoffmann.jmsproducer.controller;

import dps.hoffmann.jmsproducer.properties.SpecificationProperties;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static dps.hoffmann.jmsproducer.utils.ResourceUtils.readResource;

@RequestMapping("/spec/")
@RestController
@Slf4j
public class SpecificationController {

    @Autowired
    private SpecificationProperties specificationProperties;

    @RequestMapping("/xsd")
    public String getXsdSpecification() {
        log.info("fetched xsd specification");
        return readResource(getClass(), specificationProperties.getXsdres());
    }

}
