package com.management.library.exception;

import java.util.Date;

import com.management.library.dto.ErrorDetailDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;



@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(BadRequestServiceAlertException.class)
    public ResponseEntity<ErrorDetailDto> handleSecurityException(BadRequestServiceAlertException exception, WebRequest request) {
        exception.printStackTrace();
        new ErrorDetailDto();
        ErrorDetailDto errorDetail = ErrorDetailDto.builder()
                .status(exception.getStatusCode())
                .message(exception.getMessage())
                .stamp(new Date())
                .description(request.getDescription(false))
                .build();
        return new ResponseEntity<>(errorDetail, HttpStatus.valueOf(exception.getStatusCode()));
    }

    }
