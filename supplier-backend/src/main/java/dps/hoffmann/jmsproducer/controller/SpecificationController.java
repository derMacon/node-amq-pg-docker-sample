package dps.hoffmann.jmsproducer.controller;

import dps.hoffmann.jmsproducer.model.SpecificationWrapper;
import dps.hoffmann.jmsproducer.service.BulkService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.xml.bind.JAXBException;
import java.io.IOException;
import java.util.List;

@RequestMapping("/spec/")
@RestController
@Slf4j
public class SpecificationController {

    @Autowired
    private BulkService bulkMessengerService;


//    @RequestMapping("/refresh-sample-xsd")
//    public void refreshSampleXsd() {
//        log.info("refresh specification");
//        this.bulkMessengerService.refreshSpecs();
//    }
//
//    @PostMapping("/upload-xsd")
//    public void uploadSpecification(@RequestParam("file") MultipartFile inputFile) throws IOException,
//            JAXBException, InterruptedException {
//        log.info("upload file");
//        log.info(new String(inputFile.getBytes()));
//    }
//
//    @RequestMapping("/add")
//    public void addSpecs(
//            @RequestParam String specificationName,
//            @RequestParam String xsdContent,
//            @RequestParam String xPath
//    ) {
//        this.bulkMessengerService.addXsdSpecification(specificationName, xsdContent, xPath);
//    }
//
//    @RequestMapping("/list")
//    public List<SpecificationWrapper> getSpecs() {
//        log.info("return specs");
//        return this.bulkMessengerService.getSpecs();
//    }

}
