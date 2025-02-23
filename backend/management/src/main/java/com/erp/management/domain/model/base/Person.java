package com.erp.management.domain.model.base;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
public abstract class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name",
            length = 65,
            nullable = false)
    private String name;

    @Column(name = "phone",
            length = 11,
            unique = true,
            nullable = false)
    private String phone;

    @Column(name = "address",
            nullable = false)
    private String address;

}
