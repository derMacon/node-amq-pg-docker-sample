package dps.hoffmann.jmsproducer.service;

import dps.hoffmann.jmsproducer.model.MessageWrapper;
import dps.hoffmann.jmsproducer.model.SpecificationWrapper;
import dps.hoffmann.jmsproducer.properties.SampleProperties;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.sql.Timestamp;
import java.util.stream.Collectors;

@Service
@Slf4j
public class BulkService {

    private SampleProperties sampleProperties;

    private AmqService amqService;

    public BulkService(
            AmqService amqService,
            SampleProperties sampleProperties
    ) {
        this.amqService = amqService;
        this.sampleProperties = sampleProperties;

        addXsdSpecification(
                sampleProperties.getSpecificationName(),
                readResource(sampleProperties.getXsdres())
        );
    }

    public void createBulkSamplePayment(int messageCnt, int timePeriod) {
        // todo timeperiod...
        log.info("create bulk sample payment: {messageCnt: {}, timePeriod: {}}", messageCnt, timePeriod);
        String sampleXmlContent = readResource(this.sampleProperties.getXmlres());
        for (int i = 0; i < messageCnt; i++) {
            MessageWrapper wrapper = new MessageWrapper(sampleXmlContent, new Timestamp(System.currentTimeMillis()));
            amqService.sendObjPaymentQueueMessage(wrapper);
        }
    }

    public void addXsdSpecification(String specificationName, String xsdContent) {
        SpecificationWrapper specification = new SpecificationWrapper(specificationName, xsdContent);
        amqService.sendXsdFormatTopic(specification);
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
