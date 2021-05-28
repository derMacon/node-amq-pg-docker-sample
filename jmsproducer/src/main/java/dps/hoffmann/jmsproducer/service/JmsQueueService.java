package dps.hoffmann.jmsproducer.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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

    @Autowired
    private ObjectMapper objectMapper;

    public void sendObjPaymentQueueMessage(MessageWrapper wrapper) {
        String convertedJson = "";
        try {
            convertedJson = objectMapper.writeValueAsString(wrapper);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        log.info("converted to json: {}", convertedJson);
        sendTxtPaymentQueueMessage(convertedJson);
    }

    public void sendTxtPaymentQueueMessage(String message) {
        log.info("new txt message: {}", message);
        jmsTemplate.send(activemqProperties.getQueue(), new MessageCreator() {
            @Override
            public Message createMessage(Session session) throws JMSException {
                return session.createTextMessage(message);
            }
        });
    }

}
