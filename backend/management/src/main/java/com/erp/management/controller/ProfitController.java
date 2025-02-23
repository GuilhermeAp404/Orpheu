package com.erp.management.controller;

import com.erp.management.DTOs.ProfitDTO;
import com.erp.management.service.impl.CustomerOrderServiceImpl;
import com.erp.management.service.impl.SupplierOrderServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/profit")
public class ProfitController {
    @Autowired
    private CustomerOrderServiceImpl customerOrderService;
    @Autowired
    private SupplierOrderServiceImpl supplierOrderService;


    @GetMapping
    public ResponseEntity<ProfitDTO> getTotalProfit(){
        Double profit = customerOrderService.getTotal();
        Double loss = supplierOrderService.getTotal();

        return new ResponseEntity<>(
          new ProfitDTO(profit, loss), HttpStatus.OK
        );
    }
}
