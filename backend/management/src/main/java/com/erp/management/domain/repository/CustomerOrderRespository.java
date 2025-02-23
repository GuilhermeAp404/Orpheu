package com.erp.management.domain.repository;

import com.erp.management.domain.model.CustomerOrder;
import org.springframework.data.jpa.repository.Query;

public interface CustomerOrderRespository extends BaseRespository<CustomerOrder, Long> {
    @Query("SELECT SUM(co.total) FROM CustomerOrder co")
    Double sumTotal();
}
