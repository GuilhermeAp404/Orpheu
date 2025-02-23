package com.erp.management.domain.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "product_name",
            length = 100,
            nullable = false,
            unique = true)
    private String productName;

    @ManyToOne
    @JoinColumn(name = "category_id",
            nullable = false)
    private Category category;

    @Column(name = "cost_price",
            nullable = false)
    private Double costPrice;

    @Column(name = "selling_price",
            nullable = false)
    private Double sellingPrice;

    @Column(name="amount",
            nullable = false)
    private Integer amount = 0;

    public Product(String productName, Category category, Double costPrice, Double sellingPrice, Integer amount) {
        this.productName = productName;
        this.category = category;
        this.costPrice = costPrice;
        this.sellingPrice = sellingPrice;
        this.amount = amount;
    }

    public Product(String productName, Category category, Double costPrice, Double sellingPrice) {
        this.productName = productName;
        this.category = category;
        this.costPrice = costPrice;
        this.sellingPrice = sellingPrice;
    }
}
