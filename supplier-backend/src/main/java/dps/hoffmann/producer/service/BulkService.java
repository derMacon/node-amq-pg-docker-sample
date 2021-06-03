package dps.hoffmann.producer.service;

import dps.hoffmann.producer.model.BenchmarkRequest;
import dps.hoffmann.producer.model.PaymentMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.function.Supplier;

@Service
@Slf4j
public class BulkService {

    @Autowired
    private AmqService amqService;

    @Autowired
    private PaymentGenerator paymentGenerator;

    @Autowired
    private XPathGenerator xPathGenerator;

    public void benchmark(BenchmarkRequest benchmarkRequest) {
        log.info("bench request: {}", benchmarkRequest);

        Supplier<String> xPathSupplier = xPathGenerator.getXPathSupplier(benchmarkRequest);
        Supplier<String> paymentSupplier = paymentGenerator.getPaymentSupplier(benchmarkRequest);

        Timestamp timestamp = new Timestamp(System.currentTimeMillis());

        for (int i = 0; i < benchmarkRequest.getMessageCnt(); i++) {

            PaymentMessage msg = PaymentMessage.builder()
                    .content(paymentSupplier.get())
                    .xPath(xPathSupplier.get())
                    // todo timeperiode
                    .sentTimestamp(timestamp)
                    .build();

            amqService.sendObjPaymentQueueMessage(msg);
        }
    }

}
