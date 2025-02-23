package com.erp.management.domain.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface BaseRespository<T, ID> extends CrudRepository<T, ID> {
}
