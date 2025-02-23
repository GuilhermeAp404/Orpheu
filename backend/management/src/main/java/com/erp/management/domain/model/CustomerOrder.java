package com.erp.management.domain.model;

import com.erp.management.domain.model.base.Order;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.Date;
import java.util.List;


@Entity
@Table(name = "customer_orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class CustomerOrder extends Order {
    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @OneToMany(mappedBy = "customerOrder", fetch = FetchType.LAZY ,cascade = CascadeType.PERSIST)
    private List<CustomerOrderProduct> customerOrderProducts;
}
