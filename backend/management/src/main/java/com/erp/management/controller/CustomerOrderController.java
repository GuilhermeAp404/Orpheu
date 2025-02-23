package com.erp.management.controller;

import com.erp.management.DTOs.CustomerOrderDTO;
import com.erp.management.DTOs.SimpleMessageDTO;
import com.erp.management.mapper.CustomerOrderMapper;
import com.erp.management.service.impl.CustomerOrderServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
@RequestMapping(value = "/customer/order")
public class CustomerOrderController {
    @Autowired
    private CustomerOrderServiceImpl customerOrderService;
    @Autowired
    private CustomerOrderMapper customerOrderMapper;

    @PostMapping
    public ResponseEntity<SimpleMessageDTO> createCustomerOrder(@Valid @RequestBody CustomerOrderDTO customerOrderDTO){
        customerOrderService.save(
                customerOrderMapper.customerOrderDtoToCustomerOrder(customerOrderDTO)
        );

        return new ResponseEntity<>(
                new SimpleMessageDTO("Pedido do cliente foi criado com sucesso!"),
                HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Iterable<CustomerOrderDTO>> getAllCustomerOrders(){
        var customerOrdersList = customerOrderMapper.customerOrderListToCustomerOrderDtoList(
                customerOrderService.findAll()
        );

        return new ResponseEntity<>(
                customerOrdersList,
                HttpStatus.OK
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerOrderDTO> getCustomerOrderById(@PathVariable Long id){
        var customerOrder = customerOrderMapper.customerOrderToCustomerOrderDto(
                customerOrderService.findById(id)
                        .orElseThrow(()-> new NoSuchElementException("Pedido de fornecedor não foi encontrado!"))
        );

        return new ResponseEntity<>(
                customerOrder,
                HttpStatus.OK
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<SimpleMessageDTO> updateCustomerOrder(@PathVariable Long id, @Valid @RequestBody CustomerOrderDTO customerOrderDTO){
        customerOrderService.update(
                customerOrderMapper.customerOrderDtoToCustomerOrder(customerOrderDTO),
                id
        );

        return new ResponseEntity<>(
                new SimpleMessageDTO("Pedido do cliente alterado com successo!"),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<SimpleMessageDTO> deleteCustomerOrder(@PathVariable Long id){
        customerOrderService.delete(id);
        return new ResponseEntity<>(
                new SimpleMessageDTO("Pedido de cliente deletado com sucesso!"),
                HttpStatus.OK
        );
    }
}
