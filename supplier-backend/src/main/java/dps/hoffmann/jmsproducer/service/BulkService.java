package dps.hoffmann.jmsproducer.service;

import dps.hoffmann.jmsproducer.model.Payment;
import dps.hoffmann.jmsproducer.model.SpecificationWrapper;
import dps.hoffmann.jmsproducer.properties.SamplePaymentProperties;
import dps.hoffmann.jmsproducer.properties.SampleSpecificationProperties;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@Getter
public class BulkService {

    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    private SampleSpecificationProperties sampleSpecificationProperties;

    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    private SamplePaymentProperties samplePaymentProperties;

    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    private AmqService amqService;

    @Setter(AccessLevel.NONE)
    private List<SpecificationWrapper> specs = new ArrayList<>();

    @Setter(AccessLevel.NONE)
    private List<Payment> payments = new ArrayList<>();

    public BulkService(
            AmqService amqService,
            SampleSpecificationProperties sampleSpecificationProperties,
            SamplePaymentProperties samplePaymentProperties
    ) {
        this.amqService = amqService;
        this.sampleSpecificationProperties = sampleSpecificationProperties;
        this.samplePaymentProperties = samplePaymentProperties;

        refreshSpecs();
        refreshPayments();
    }

    public void refreshSpecs() {
        addXsdSpecification(
                sampleSpecificationProperties.getSpecificationName(),
                readResource(sampleSpecificationProperties.getXsdres()),
                sampleSpecificationProperties.getXPath()
        );
    }

    public void refreshPayments() {
        addPayment(
                samplePaymentProperties.getPaymentName(),
                samplePaymentProperties.getXmlres()
        );
    }

    public void addPayment(String paymentName, String xmlContent) {
        this.payments.add(new Payment(paymentName, xmlContent));
    }


    public void benchmark(
            int messageCnt,
            int timePeriod
    ) {
        log.info("starting benchmark with following data: \n{" +
                        "\n\tmessageCnt: {}" +
                        "\n\ttimePeriod: {}" +
                        "\n}", messageCnt, timePeriod
        );

        // todo timeperiod...
//        log.info("create bulk sample payment: {messageCnt: {}, timePeriod: {}}", messageCnt, timePeriod);
//        String sampleXmlContent = readResource(this.samplePaymentProperties.getXmlres());
//
//        for (int i = 0; i < messageCnt; i++) {
//            PaymentMessage wrapper = new PaymentMessage(
//                    sampleXmlContent,
//                    sampleSpecificationProperties.getSpecificationName(),
//                    new Timestamp(System.currentTimeMillis())
//            );
//            amqService.sendObjPaymentQueueMessage(wrapper);
//        }
    }

    public void addXsdSpecification(String specificationName, String xsdContent, String xPath) {

        SpecificationWrapper specification = new SpecificationWrapper(
                specificationName,
                xsdContent,
                xPath
        );

        log.info("new specs: ", specification);

        if (specs.contains(specification)) {
            throw new DuplicateKeyException("specification already exists: " + specificationName);
        }

        specs.add(specification);
    }

    private String readResource(String filename) {
        String content = "";
        try (InputStream inputStream = getClass().getResourceAsStream(filename);
             BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream))) {
            content = reader.lines()
                    .collect(Collectors.joining(System.lineSeparator()));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return content;
    }


}
