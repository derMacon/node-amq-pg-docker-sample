package dps.hoffmann.jmsproducer.service;

import dps.hoffmann.jmsproducer.model.MessageWrapper;
import dps.hoffmann.jmsproducer.properties.ActivemqProperties;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessageCreator;
import org.springframework.stereotype.Service;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.Session;

@Service
@Slf4j
public class JmsQueueService {

    @Autowired
    JmsTemplate jmsTemplate;

    @Autowired
    private ActivemqProperties activemqProperties;

    public void sendObjMessage(String message, String destination) {
        log.info("new message: {}", message);
        jmsTemplate.convertAndSend(destination, new MessageWrapper(message));
    }

    public void sendTxtMessage(String message) {
        log.info("new txt message: {}", message);
        jmsTemplate.send(activemqProperties.getQueue(), new MessageCreator() {
            @Override
            public Message createMessage(Session session) throws JMSException {
                return session.createTextMessage(message);
            }
        });
    }

}
