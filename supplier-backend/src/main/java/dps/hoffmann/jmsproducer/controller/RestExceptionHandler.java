package dps.hoffmann.jmsproducer.controller;

import dps.hoffmann.jmsproducer.model.ApiError;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(DuplicateKeyException.class)
    protected ResponseEntity<Object> handleHttpMessageNotReadable(DuplicateKeyException ex) {
        ApiError error = new ApiError(HttpStatus.BAD_REQUEST, ex);
        return new ResponseEntity<>(error, error.getStatus());
    }

}