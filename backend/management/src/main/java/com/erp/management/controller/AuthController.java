package com.erp.management.controller;

import com.erp.management.DTOs.auth.AuthDTO;
import com.erp.management.DTOs.auth.LoginDTO;
import com.erp.management.exception.InvalidPassword;
import com.erp.management.security.TokenService;
import com.erp.management.security.UserDetailsImpl;
import com.erp.management.security.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping(value = "/auth")
public class AuthController {
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<AuthDTO> loginUser(@RequestBody LoginDTO login){
        UserDetailsImpl user = userDetailsService.loadUserByUsername(login.email());

        if(passwordEncoder.matches(login.password(), user.getPassword())) {
            String token = tokenService.createToken(user);
            return new ResponseEntity<>(
                    new AuthDTO(
                            user.getUser().getId(), user.getUser().getUsername(), user.getUser().getEmail(),
                            token
                    ), HttpStatus.OK);
        }else{
            throw new InvalidPassword();
        }
    }

    @GetMapping("/check")
    public ResponseEntity checkUser(){
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
