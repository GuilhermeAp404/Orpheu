package com.erp.management.service;

import java.util.Optional;

public interface CRUDService<T, ID> {
    Iterable<T> findAll();

    Optional<T>findById(ID id);

    T save(T t);

    T update(T t, ID id);

    void delete(ID id);
}
