package com.erp.management.domain.model;

import com.erp.management.domain.model.base.Order;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "supplier_orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class SupplierOrder extends Order {
    @ManyToOne
    @JoinColumn(name = "supplier_id", nullable = false)
    private Supplier supplier;

    @OneToMany(mappedBy = "supplierOrder", fetch = FetchType.LAZY ,cascade = CascadeType.PERSIST)
    private List<SupplierOrderProduct> supplierOrderProducts;

}
