package dps.hoffmann.jmsproducer;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class TestController {

    @RequestMapping("/test")
    public String testCall() {
        log.info("making test call");
        return "making test call";
    }

    @RequestMapping("/")
    public String testCall2() {
        log.info("another one");
        return "another one";
    }

}
