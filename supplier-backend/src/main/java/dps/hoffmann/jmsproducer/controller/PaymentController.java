package dps.hoffmann.jmsproducer.controller;

import dps.hoffmann.jmsproducer.service.BulkService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;
import java.util.List;

@RequestMapping("/options")
@RestController
@Slf4j
public class PaymentController {

    @Autowired
    private BulkService bulkMessengerService;

    @RequestMapping("/payment")
    public List<String> getPaymentOptions() {
        log.info("fetch payments");
        List<String> testlst = new LinkedList<>();

        testlst.add("test1");
        testlst.add("test2");
        testlst.add("test3");
        testlst.add("test4");

        return testlst;
    }

    @RequestMapping("/path")
    public List<String> getPathOptions() {
        log.info("fetch paths");
        List<String> testlst = new LinkedList<>();

        testlst.add("path1");
        testlst.add("path2");
        testlst.add("path3");
        testlst.add("path4");

        return testlst;
    }



//    @RequestMapping("/add-payment")
//    public void addPayment(
//            @RequestParam String paymentName,
//            @RequestParam String xmlContent
//    ) {
//        log.info("add payment: " + paymentName);
//        this.bulkMessengerService.addPayment(paymentName, xmlContent);
//    }
//
//    @RequestMapping("/get-payments")
//    public List<Payment> getPayments() {
//        log.info("return payments");
//        return this.bulkMessengerService.getPayments();
//    }

}
