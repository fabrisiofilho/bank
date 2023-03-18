package br.com.hiven.bank.rest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class SuccessResponse<T> {

    public ResponseEntity<T> handle(T request, HttpStatus ok) {
        return new ResponseEntity<>(request, ok);
    }
}
