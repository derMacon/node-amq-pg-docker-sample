package dps.hoffmann.producer.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import dps.hoffmann.producer.model.PaymentMessage;
import dps.hoffmann.producer.properties.ActivemqProperties;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessageCreator;
import org.springframework.stereotype.Service;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.Session;

@Service
@Slf4j
public class AmqService {

    @Autowired
    JmsTemplate jmsQueueTemplate;

//    @Autowired
//    @Qualifier("topicTemplate")
//    JmsTemplate jmsTopicTemplate;

    @Autowired
    private ActivemqProperties activemqProperties;

    @Autowired
    private ObjectMapper objectMapper;

    public void sendObjPaymentQueueMessage(PaymentMessage wrapper) {
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
        jmsQueueTemplate.send(activemqProperties.getQueue(), new MessageCreator() {
            @Override
            public Message createMessage(Session session) throws JMSException {
                return session.createTextMessage(message);
            }
        });
    }

//    public void sendXsdFormatTopic(SpecificationWrapper wrapper) {
//        log.info("xsd format: ", wrapper);
//        this.jmsTopicTemplate.send(this.activemqProperties.getTopic(), new MessageCreator() {
//            @SneakyThrows
//            @Override
//            public Message createMessage(Session session) throws JMSException {
//                String tmp = objectMapper.writeValueAsString(wrapper);
//                log.info("obj mapper: " + tmp);
//                return session.createTextMessage(objectMapper.writeValueAsString(wrapper));
//            }
//        });
//    }

}
