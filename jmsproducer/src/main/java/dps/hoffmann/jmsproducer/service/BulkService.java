package dps.hoffmann.jmsproducer.service;

import dps.hoffmann.jmsproducer.model.MessageWrapper;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.sql.Timestamp;
import java.util.stream.Collectors;

@Service
@Slf4j
public class BulkService {

    @Value("${sample.xmlres}")
    private String xmlResourceName;

    @Autowired
    private JmsQueueService jmsQueueService;

    public void createBulkSamplePayment(int messageCnt, int timePeriod) {
        // todo timeperiod...
        log.info("create bulk sample payment: {messageCnt: {}, timePeriod: {}}", messageCnt, timePeriod);
        String sampleXmlContent = createSampleXmlMessage();
        for (int i = 0; i < messageCnt; i++) {
            MessageWrapper wrapper = new MessageWrapper(sampleXmlContent, new Timestamp(System.currentTimeMillis()));
            jmsQueueService.sendObjPaymentQueueMessage(wrapper);
        }
    }

    private String createSampleXmlMessage() {
        String content = "";

        try (InputStream inputStream = getClass().getResourceAsStream("/docs/sample-payment.xml");
             BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream))) {
            content = reader.lines()
                    .collect(Collectors.joining(System.lineSeparator()));
        } catch (IOException e) {
            e.printStackTrace();
        }

        return content;
    }


}
