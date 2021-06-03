package dps.hoffmann.jmsproducer.config;

import dps.hoffmann.jmsproducer.properties.ActivemqProperties;
import org.apache.activemq.ActiveMQConnectionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jms.config.DefaultJmsListenerContainerFactory;
import org.springframework.jms.connection.CachingConnectionFactory;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.jms.annotation.EnableJms;

import javax.jms.ConnectionFactory;
import java.util.Arrays;

@Configuration
@EnableJms
@EnableTransactionManagement
public class ActiveMqConfiguration {

    @Autowired
    private ActivemqProperties activemqProperties;

    @Bean
    public ConnectionFactory senderActiveMQConnectionFactory() {
        ActiveMQConnectionFactory activeMQConnectionFactory =
                new ActiveMQConnectionFactory();
        activeMQConnectionFactory.setBrokerURL(activeMQConnectionFactory.getBrokerURL());
        activeMQConnectionFactory.setTrustedPackages(Arrays.asList(
                "dps.hoffmann",
                "java.time",
                "java.sql",
                "java.lang"));

        return activeMQConnectionFactory;
    }

    @Bean
    @Primary
    public CachingConnectionFactory cachingConnectionFactory() {
        return new CachingConnectionFactory(
                senderActiveMQConnectionFactory());
    }

    @Bean
    public DefaultJmsListenerContainerFactory jmsListenerContainerFactory(
            ConnectionFactory connectionFactory) {
        DefaultJmsListenerContainerFactory factory = new DefaultJmsListenerContainerFactory();
        factory.setConnectionFactory(connectionFactory);
        return factory;
    }

    /**
     * Provides the jms template instance
     * IMPORTANT: to make the whole main producer method transactional,
     * the option from the template must be set to session transacted
     * @return jms template instance
     */
    @Bean
    public JmsTemplate jmsTemplate() {
        JmsTemplate jmsTemplate = new JmsTemplate();
        jmsTemplate.setConnectionFactory(cachingConnectionFactory());
        return jmsTemplate;
    }

}