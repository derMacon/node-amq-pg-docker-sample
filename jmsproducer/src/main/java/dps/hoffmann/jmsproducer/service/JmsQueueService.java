package dps.hoffmann.jmsproducer.service;

import dps.hoffmann.jmsproducer.model.MessageWrapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class JmsQueueService {

    @Autowired
    JmsTemplate jmsTemplate;

    public void sendMessage(String message, String destination) {
        log.info("new message: {}", message);
        jmsTemplate.convertAndSend(destination, new MessageWrapper(message));
    }

}
