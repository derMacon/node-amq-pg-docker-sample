package dps.publicsector.controller;


import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/benchmark")
@RestController
@Slf4j
public class BenchmarkingController {

//    @Autowired
//    private BulkService bulkMessengerService;
//
//    @Autowired
//    private ObjectMapper mapper;
//
//    @RequestMapping(value = "/start",
//            method = POST,
//            consumes = APPLICATION_JSON_VALUE,
//            produces = APPLICATION_JSON_VALUE)
//    public void startBenchmark(@RequestBody String jsonBody) throws JsonProcessingException {
//        BenchmarkRequest req = mapper.readValue(jsonBody, BenchmarkRequest.class);
//        bulkMessengerService.benchmark(req);
//    }

}
