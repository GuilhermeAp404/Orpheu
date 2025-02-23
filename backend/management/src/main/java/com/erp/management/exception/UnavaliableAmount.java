package com.erp.management.exception;

public class UnavaliableAmount extends RuntimeException {
    public UnavaliableAmount() {
        super("A quantidade solicitada não está disponível no momento. Por favor, tente novamente mais tarde.");
    }
}
