package com.erp.management.domain.repository;

import com.erp.management.domain.model.Product;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends BaseRespository<Product, Long> {
}
