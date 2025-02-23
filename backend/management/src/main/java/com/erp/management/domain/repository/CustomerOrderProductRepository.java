package com.erp.management.domain.repository;

import com.erp.management.domain.model.CustomerOrderProduct;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface CustomerOrderProductRepository extends BaseRespository<CustomerOrderProduct, Long>{
    @Modifying
    @Query("DELETE FROM CustomerOrderProduct cop WHERE cop.customerOrder.id = ?1")
    void deleteAllByCustomerOrder(Long orderId);
}

