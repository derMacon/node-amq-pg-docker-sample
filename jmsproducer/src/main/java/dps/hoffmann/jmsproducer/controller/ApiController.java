package dps.hoffmann.jmsproducer.controller;

import dps.hoffmann.jmsproducer.service.BulkService;
import dps.hoffmann.jmsproducer.service.JmsQueueService;
import dps.hoffmann.jmsproducer.utils.NameGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/v1")
@RestController
public class ApiController {

    @Autowired
    private JmsQueueService jmsQueueService;

    @Autowired
    private BulkService bulkMessengerService;

    @RequestMapping("/")
    public String healthGet() {
        return "component is healthy";
    }

    @RequestMapping("/gen-txt-message")
    public String generateMessage() {
        String txtMessage = NameGenerator.generateTestMessage();
        jmsQueueService.sendTxtPaymentQueueMessage(txtMessage);
        return txtMessage;
    }

    @RequestMapping("/gen-xml-message")
    public String generateXmlMessage(
            @RequestParam(defaultValue = "1") Integer msgCnt,
            @RequestParam(defaultValue = "0") Integer timePeriod
    ) {
        bulkMessengerService.createBulkSamplePayment(msgCnt, timePeriod);
        return "sent " + msgCnt + " sample xml payment messages";
    }

}
