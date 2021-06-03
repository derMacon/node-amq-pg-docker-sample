package dps.hoffmann.producer.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.Value;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;
import java.sql.Timestamp;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class PaymentMessage implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int batchId;
    private String content;
    private String xPath;
    private Timestamp sentTimestamp;

}
