package dps.hoffmann.jmsproducer.service;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Service
public class BulkService {

    @Value("${sample.xml-res}")
    private String xmlResourceName;

    @Autowired
    private JmsQueueService jmsQueueService;

    public void createBulkSamplePayment(int messageCnt, int timePeriod) {
        // todo timeperiod...
        String sampleXmlContent = createSampleXmlMessage();
        for (int i = 0; i < messageCnt; i++) {
            jmsQueueService.sendTxtMessage(sampleXmlContent);
        }
    }

    private String createSampleXmlMessage() {
        ClassLoader classLoader = getClass().getClassLoader();
        File sampleXml = new File(classLoader.getResource(xmlResourceName).getFile());

        String content = "";
        try {
            content = FileUtils.readFileToString(sampleXml, StandardCharsets.UTF_8);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return content;
    }


}
