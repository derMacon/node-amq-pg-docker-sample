package dps.hoffmann.jmsproducer.controller;

import dps.hoffmann.jmsproducer.service.BulkService;
import dps.hoffmann.jmsproducer.service.AmqService;
import dps.hoffmann.jmsproducer.utils.NameGenerator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.xml.bind.JAXBException;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

@RequestMapping("/api/v1")
@RestController
@Slf4j
public class ApiController {

    @Autowired
    private AmqService amqService;

    @Autowired
    private BulkService bulkMessengerService;

    @RequestMapping("/")
    public String healthGet() {
        return "component is healthy";
    }

    @RequestMapping("/gen-txt-message")
    public String generateMessage() {
        String txtMessage = NameGenerator.generateTestMessage();
        amqService.sendTxtPaymentQueueMessage(txtMessage);
        return txtMessage;
    }

    @RequestMapping("/gen-xml-message")
    public String generateXmlMessage(
            @RequestParam(defaultValue = "1") Integer msgCnt,
            @RequestParam(defaultValue = "0") Integer timePeriod
    ) {
        bulkMessengerService.createBulkSamplePayment(msgCnt, timePeriod);
        return "sent " + msgCnt + " sample xml payment messages";
    }

    @PostMapping("/upload")
    public void handleFileUpload(@RequestParam("file") MultipartFile inputFile) throws IOException,
            JAXBException, InterruptedException {
        log.info("upload file");
        log.info(new String(inputFile.getBytes()));
    }

    /**
     * Saves a uploaded file to the external directory
     * @param multipartFile file which the user uploaded
     * @throws IOException error with io
     */
//    private void saveToExternalDir(MultipartFile multipartFile) throws IOException {
//        File out = new File(externalPath + File.separator + multipartFile.getOriginalFilename());
//        try (OutputStream os = new FileOutputStream(out)) {
//            os.write(multipartFile.getBytes());
//        }
//    }




}
