package dps.hoffmann.producer.repository;

import dps.hoffmann.producer.model.PaymentMessage;
import org.springframework.data.repository.CrudRepository;

public interface PaymentMessageRespository extends CrudRepository<PaymentMessage, Integer> {
}
