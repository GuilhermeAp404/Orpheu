package com.erp.management.domain.model;

import com.erp.management.domain.model.base.Person;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Table(name = "suppliers")
@Entity
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class Supplier extends Person {
    @Column(name = "register",
            length = 14,
            unique = true,
            nullable = false)
    private String register;
}
