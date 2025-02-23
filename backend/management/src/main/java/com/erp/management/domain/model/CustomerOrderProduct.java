package com.erp.management.domain.model;

import com.erp.management.domain.model.base.OrderProduct;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "customer_order_products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class CustomerOrderProduct extends OrderProduct {
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "customer_order")
    private CustomerOrder customerOrder;
}
