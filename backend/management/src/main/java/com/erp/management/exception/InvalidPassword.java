package com.erp.management.exception;

public class InvalidPassword extends RuntimeException {
    public InvalidPassword() {
        super("Senha inválida, tente novamente!");
    }
}
