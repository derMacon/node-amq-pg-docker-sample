package dps.hoffmann.jmsproducer.service;

import dps.hoffmann.jmsproducer.model.BenchmarkRequest;
import dps.hoffmann.jmsproducer.model.PaymentMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Service
@Slf4j
public class BulkService {

    @Autowired
    private AmqService amqService;

    @Autowired
    private PaymentGenerator paymentGenerator;


    public void benchmark(BenchmarkRequest benchmarkRequest) {
        log.info("bench request: {}", benchmarkRequest);

        // todo timeperiode
        // todo analyze generator input key
        String sampleXmlContent = paymentGenerator.nextRandom();

        for (int i = 0; i < benchmarkRequest.getMessageCnt(); i++) {
            PaymentMessage wrapper = new PaymentMessage(
                    sampleXmlContent,
                    benchmarkRequest.getPathOption(),
                    new Timestamp(System.currentTimeMillis())
            );
            amqService.sendObjPaymentQueueMessage(wrapper);
        }
    }

}
