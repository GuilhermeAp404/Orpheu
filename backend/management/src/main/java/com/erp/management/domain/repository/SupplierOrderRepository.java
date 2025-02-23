package com.erp.management.domain.repository;

import com.erp.management.domain.model.SupplierOrder;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierOrderRepository extends BaseRespository<SupplierOrder, Long> {
    @Query("SELECT SUM(so.total) FROM SupplierOrder so")
    Double sumTotal();
}
