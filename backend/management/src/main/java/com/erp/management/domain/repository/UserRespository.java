package com.erp.management.domain.repository;

import com.erp.management.domain.model.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRespository extends BaseRespository<User, Long> {
    Optional<User> findByEmail(String email);
}
