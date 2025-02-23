package com.erp.management.domain.model;

import com.erp.management.domain.model.base.Person;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "customers")
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
public class Customer extends Person {

}
