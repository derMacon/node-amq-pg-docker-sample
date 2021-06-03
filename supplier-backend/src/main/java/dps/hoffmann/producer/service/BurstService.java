package dps.hoffmann.producer.service;

import dps.hoffmann.producer.model.BenchmarkRequest;
import dps.hoffmann.producer.model.PaymentMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.function.Consumer;
import java.util.function.Supplier;

@Service
@Slf4j
public class BurstService {

    @Autowired
    private AmqService amqService;

    @Autowired
    private PaymentGenerator paymentGenerator;

    @Autowired
    private XPathGenerator xPathGenerator;

    @Autowired
    private PersistenceService persistenceService;

    @Transactional
    public void benchmark(BenchmarkRequest benchmarkRequest) throws InterruptedException {
        log.info("bench request: {}", benchmarkRequest);

        boolean sessionIsTransacted = sessionIsTransacted(benchmarkRequest);
        log.info("session transacted: {}", sessionIsTransacted);

        Supplier<String> paymentSupplier = paymentGenerator.getPaymentSupplier(benchmarkRequest);
        Supplier<String> xPathSupplier = xPathGenerator.getXPathSupplier(benchmarkRequest);
        Consumer<PaymentMessage> amqConsumer = amqService.getConsumer(sessionIsTransacted);


        int durationMillis = 0;
        if (!sessionIsTransacted) {
            durationMillis = benchmarkRequest.getDuration() * 1000
                    / (benchmarkRequest.getMessageCnt() - 1);
        }


        for (int i = 0; i < benchmarkRequest.getMessageCnt(); i++) {

            PaymentMessage payment = PaymentMessage.builder()
                    .content(paymentSupplier.get())
                    .xPath(xPathSupplier.get())
                    .sentTimestamp(new Timestamp(System.currentTimeMillis()))
                    .build();

            // update payment id by saving it to db
            payment = persistenceService.save(payment);
            amqConsumer.accept(payment);

            Thread.sleep(durationMillis);
        }
    }

    /**
     * Defines if all messages should be send in one transaction or not
     * @param request data object holding relevant information
     * @return true if all messages should be send in one transaction
     */
    private boolean sessionIsTransacted(BenchmarkRequest request) {
        return request.getMessageCnt() <= 1 || request.getDuration() <= 0;
    }

}
