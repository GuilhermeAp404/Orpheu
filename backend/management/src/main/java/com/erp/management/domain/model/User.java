package com.erp.management.domain.model;

import com.erp.management.enuns.UserRole;
import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Table(name="users")
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username",
            nullable = false,
            unique = true)
    private String username;

    @Column(name = "password",
            nullable = false)
    private String password;

    @Column(name="email",
            nullable = false)
    private String email;

    @Column(name = "role",
            nullable = false)
    private UserRole role;
}
