package dps.hoffmann.jmsproducer.controller;

import dps.hoffmann.jmsproducer.properties.ActivemqProperties;
import dps.hoffmann.jmsproducer.service.JmsQueueService;
import dps.hoffmann.jmsproducer.utils.NameGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/v1")
@RestController
public class ApiController {

    @Autowired
    private JmsQueueService jmsQueueService;

    @Autowired
    private ActivemqProperties activemqProperties;

    @RequestMapping("/")
    public String healthGet() {
        return "component is healthy";
    }

    @RequestMapping("/gen-message")
    public String generateMessage() {
        String txtMessage = NameGenerator.generateTestMessage();
        jmsQueueService.sendMessage(txtMessage, activemqProperties.getQueue());
        return txtMessage;
    }

}
