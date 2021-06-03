package dps.hoffmann.producer.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;
import org.springframework.http.HttpStatus;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;

/**
 * Error do display for invalid api call
 */
@Data // @Data implements @ToString, @EqualsAndHashCode, @Getter, @Setter @RequiredArgsContructor
@Builder
public class ErrorInfo {
    private final HttpStatus status;
    private final String url;
    private final String exception;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
    private final LocalDateTime timestamp = LocalDateTime.now();

    /**
     * custom builder methods, not implemented methods will be autogenerated
     */
    public static class ErrorInfoBuilder {

        public ErrorInfoBuilder url(HttpServletRequest req) {
            this.url = req.getRequestURL().toString();
            return this;
        }

        public ErrorInfoBuilder exception(Throwable ex) {
            this.exception = ex.getLocalizedMessage();
            return this;
        }
    }

}