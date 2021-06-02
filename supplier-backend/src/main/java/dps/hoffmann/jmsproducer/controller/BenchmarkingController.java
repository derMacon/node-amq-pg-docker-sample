package dps.hoffmann.jmsproducer.controller;

import dps.hoffmann.jmsproducer.service.BulkService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/benchmark")
@RestController
@Slf4j
public class BenchmarkingController {

    @Autowired
    private BulkService bulkMessengerService;

    // todo delete this
    // ------------ sample message creation ------------ //
//    @RequestMapping("/gen-txt-message")
//    public String generateMessage() {
//        String txtMessage = NameGenerator.generateTestMessage();
//        amqService.sendTxtPaymentQueueMessage(txtMessage);
//        return txtMessage;
//    }


    @RequestMapping("/start")
    public String generateXmlMessage(
            @RequestParam(defaultValue = "defaultPayment") String paymentName,
            @RequestParam(defaultValue = "defaultSpecification") String specName,
            @RequestParam(defaultValue = "1") Integer msgCnt,
            @RequestParam(defaultValue = "0") Integer timePeriod
    ) {
        bulkMessengerService.benchmark(
                paymentName,
                specName,
                msgCnt,
                timePeriod
        );
        return "sent " + msgCnt + " sample xml payment messages";
    }

}
