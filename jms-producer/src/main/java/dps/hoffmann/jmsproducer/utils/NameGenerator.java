package dps.hoffmann.jmsproducer.utils;

import java.sql.Timestamp;

public class NameGenerator {

    public static String generateTestMessage() {
        return "generated test message at " + new Timestamp(System.currentTimeMillis());
    }
}
