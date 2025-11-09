package com.mina.khedma.utilities;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class Utility {

    public static HttpStatus OK_STATUS = HttpStatus.OK;
    public static HttpStatus ISE_STATUS = HttpStatus.INTERNAL_SERVER_ERROR;
    public static HttpStatus BR_STATUS = HttpStatus.BAD_REQUEST;

    public static ResponseEntity<?> ok(HttpStatus status, String message) {
        return new ResponseEntity<>(message, status);
    }

    public static ResponseEntity<?> error(HttpStatus status, String message) {
        return new ResponseEntity<>(message, status);
    }

    public static <T> ResponseEntity<?> response(HttpStatus status, T body) {
        return new ResponseEntity<>(body, status);
    }
}
