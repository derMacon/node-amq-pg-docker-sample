package dps.hoffmann.jmsproducer.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import dps.hoffmann.jmsproducer.model.BenchmarkRequest;
import dps.hoffmann.jmsproducer.service.BulkService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RequestMapping("/benchmark")
@RestController
@Slf4j
public class BenchmarkingController {

    @Autowired
    private BulkService bulkMessengerService;

    @Autowired
    private ObjectMapper mapper;

    @RequestMapping(value = "/start",
            method = POST,
            consumes = APPLICATION_JSON_VALUE,
            produces = APPLICATION_JSON_VALUE)
    public void startBenchmark(@RequestBody String jsonBody) throws JsonProcessingException {
        BenchmarkRequest req = mapper.readValue(jsonBody, BenchmarkRequest.class);
        bulkMessengerService.benchmark(req);
    }

}
