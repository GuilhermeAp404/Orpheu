package com.erp.management.exception.handler;

import com.erp.management.DTOs.SimpleMessageDTO;
import com.erp.management.exception.InvalidPassword;
import com.erp.management.exception.InvalidSupplierRegister;
import com.erp.management.exception.UnavaliableAmount;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@RestControllerAdvice
public class ExceptionController {

    @ExceptionHandler({NoSuchElementException.class,
            UnavaliableAmount.class,
            InvalidSupplierRegister.class})
    public ResponseEntity<SimpleMessageDTO> exceptionHandler(Exception ex){
        return new ResponseEntity<>(new SimpleMessageDTO(ex.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<SimpleMessageDTO> dataIntegrityViolationHandler(DataIntegrityViolationException ex){
        var message = new SimpleMessageDTO("Um erro ocorreu ao acessar a base de dados. Por favor, tente novamente.");

        if(ex.getMessage().contains("Duplicate")){
            message = new SimpleMessageDTO("Os dados inseridos já existem em nosso sistema. Por favor, verifique e tente novamente.");
        }

        if(ex.getMessage().contains("Cannot delete or update")){
            message = new SimpleMessageDTO("Para garantir que seus dados permaneçam seguros, não podemos excluir este item no momento.");
        }

        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<List<String>> methodArgumentNotValidExceptionHandler(MethodArgumentNotValidException ex){
        List<String> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .toList();

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidPassword.class)
    public ResponseEntity<SimpleMessageDTO> invalidPasswordExceptionHandler(InvalidPassword ex){
        var message = new SimpleMessageDTO(ex.getMessage());
        return new ResponseEntity<>(message, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<SimpleMessageDTO> usernameNotFoundExceptionHandler(UsernameNotFoundException ex){
        var message = new SimpleMessageDTO(ex.getMessage());
        return new ResponseEntity<>(message, HttpStatus.UNAUTHORIZED);
    }
}
