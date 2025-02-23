package com.erp.management.security;

import com.erp.management.domain.model.User;
import com.erp.management.domain.repository.UserRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UserRespository userRespository;

    @Override
    public UserDetailsImpl loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRespository.findByEmail(username).orElseThrow(()-> new UsernameNotFoundException("Usuario não encontrado"));
        return new UserDetailsImpl(user);
    }
}
