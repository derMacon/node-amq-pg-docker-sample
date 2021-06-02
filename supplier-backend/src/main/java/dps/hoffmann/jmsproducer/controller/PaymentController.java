package dps.hoffmann.jmsproducer.controller;

import dps.hoffmann.jmsproducer.model.Payment;
import dps.hoffmann.jmsproducer.service.BulkService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/payment")
@RestController
@Slf4j
public class PaymentController {

    @Autowired
    private BulkService bulkMessengerService;

    @RequestMapping("/add-payment")
    public void addPayment(
            @RequestParam String paymentName,
            @RequestParam String xmlContent
    ) {
        log.info("add payment: " + paymentName);
        this.bulkMessengerService.addPayment(paymentName, xmlContent);
    }

    @RequestMapping("/get-payments")
    public List<Payment> getPayments() {
        log.info("return payments");
        return this.bulkMessengerService.getPayments();
    }

}
