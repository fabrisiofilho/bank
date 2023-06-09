package br.com.hiven.bank.handler;

import br.com.hiven.bank.exception.BuninessException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class ControllerExceptionsHandler {

    @ExceptionHandler({ BuninessException.class })
    public ResponseEntity<Object> handleAccessDeniedException(
            Exception ex, WebRequest request) {
        return new ResponseEntity<>(
                ex.getMessage(), new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }

}
