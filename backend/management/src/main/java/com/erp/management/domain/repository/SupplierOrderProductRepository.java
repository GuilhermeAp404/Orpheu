package com.erp.management.domain.repository;

import com.erp.management.domain.model.SupplierOrderProduct;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierOrderProductRepository extends BaseRespository<SupplierOrderProduct, Long> {
    @Modifying
    @Query("DELETE FROM SupplierOrderProduct sop WHERE sop.supplierOrder.id = ?1")
    void deleteAllBySupplierOrder(Long orderId);
}
