package dps.hoffmann.producer.service;

import dps.hoffmann.producer.model.PaymentMessage;
import dps.hoffmann.producer.repository.PaymentMessageRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersistenceService {

    @Autowired
    private PaymentMessageRespository paymentMessageRespository;


    public PaymentMessage save(PaymentMessage payment) {
        return this.paymentMessageRespository.save(payment);
    }


}
