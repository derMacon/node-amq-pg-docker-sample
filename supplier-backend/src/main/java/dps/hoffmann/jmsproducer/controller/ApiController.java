package dps.hoffmann.jmsproducer.controller;

import dps.hoffmann.jmsproducer.model.Payment;
import dps.hoffmann.jmsproducer.model.SpecificationWrapper;
import dps.hoffmann.jmsproducer.service.AmqService;
import dps.hoffmann.jmsproducer.service.BulkService;
import dps.hoffmann.jmsproducer.utils.NameGenerator;
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

@RequestMapping("/api/v1")
@RestController
@Slf4j
public class ApiController {

    @Autowired
    private AmqService amqService;

    @Autowired
    private BulkService bulkMessengerService;


    @RequestMapping("/")
    public String healthGet() {
        log.info("user called health endpoint");
        return "component is healthy";
    }


    // ------------ sample message creation ------------ //

    @RequestMapping("/gen-txt-message")
    public String generateMessage() {
        String txtMessage = NameGenerator.generateTestMessage();
        amqService.sendTxtPaymentQueueMessage(txtMessage);
        return txtMessage;
    }

    @RequestMapping("/refresh-sample-xsd")
    public void refreshSampleXsd() {
        log.info("refresh specification");
        this.bulkMessengerService.refreshSpecs();
    }


    // ------------ benchmarking ------------ //

    @RequestMapping("/gen-xml-message")
    public String generateXmlMessage(
            @RequestParam(defaultValue = "1") Integer msgCnt,
            @RequestParam(defaultValue = "0") Integer timePeriod
    ) {
        bulkMessengerService.createBulkSamplePayment(msgCnt, timePeriod);
        return "sent " + msgCnt + " sample xml payment messages";
    }


    // ------------ payment ------------ //

    @RequestMapping("/add-payment")
    public void addPayment(
            @RequestParam String paymentName,
            @RequestParam String xmlContent
    ) {
        log.info("add payment: " + paymentName);
        this.bulkMessengerService.addPayment(paymentName, xmlContent);
    }

    @RequestMapping("/get-payments")
    public List<Payment> getPayments() {
        log.info("return payments");
        return this.bulkMessengerService.getPayments();
    }

    // ------------ specification ------------ //

    @PostMapping("/upload-xsd")
    public void uploadSpecification(@RequestParam("file") MultipartFile inputFile) throws IOException,
            JAXBException, InterruptedException {
        log.info("upload file");
        log.info(new String(inputFile.getBytes()));
    }


    @RequestMapping("/add-specs")
    public void addSpecs(
            @RequestParam String specificationName,
            @RequestParam String xsdContent,
            @RequestParam String xPath
    ) {
        this.bulkMessengerService.addXsdSpecification(specificationName, xsdContent, xPath);
    }

    @RequestMapping("/get-specs")
    public List<SpecificationWrapper> getSpecs() {
        log.info("return specs");
        return this.bulkMessengerService.getSpecs();
    }

}
