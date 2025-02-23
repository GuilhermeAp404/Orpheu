package com.erp.management.controller;

import com.erp.management.DTOs.SupplierOrderDTO;
import com.erp.management.DTOs.SimpleMessageDTO;
import com.erp.management.mapper.SupplierMapper;
import com.erp.management.mapper.SupplierOrderMapper;
import com.erp.management.service.impl.SupplierOrderServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
@RequestMapping(value = "/supplier/order")
public class SupplierOrderController {
    @Autowired
    private SupplierOrderServiceImpl supplierOrderService;
    @Autowired
    private SupplierOrderMapper supplierOrderMapper;

    @PostMapping
    public ResponseEntity<SimpleMessageDTO> createSupplierOrder(@Valid @RequestBody SupplierOrderDTO supplierOrderDTO){
        supplierOrderService.save(
                supplierOrderMapper.supplierOrderDtoToSupplierOrder(supplierOrderDTO)
        );

        return new ResponseEntity<>(
                new SimpleMessageDTO("Você realizou uma entrada no estoque!"),
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity<Iterable<SupplierOrderDTO>> getAllSupplierOrders(){
        var supplierOrdersList = supplierOrderMapper.supplierOrderListToSupplierOrderDtoList(
                supplierOrderService.findAll()
        );

        return new ResponseEntity<>(
                supplierOrdersList,
                HttpStatus.OK
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<SupplierOrderDTO> getSupplierOrderById(@PathVariable Long id){
        var supplierOrder = supplierOrderMapper.supplierOrderToSupplierOrderDto(
                supplierOrderService.findById(id)
                        .orElseThrow(()->new NoSuchElementException("Pedido do fornecedor não foi encontrado!"))
        );

        return new ResponseEntity<>(
                supplierOrder,
                HttpStatus.OK
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<SimpleMessageDTO> updateSupplierOrder(@PathVariable Long id, @Valid @RequestBody SupplierOrderDTO supplierOrderDTO){
        supplierOrderService.update(
                supplierOrderMapper.supplierOrderDtoToSupplierOrder(supplierOrderDTO),
                id
        );

        return new ResponseEntity<>(
                new SimpleMessageDTO("Pedido do fornecedor alterado com successo!"),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<SimpleMessageDTO> deleteSupplierOrder(@PathVariable Long id){
        supplierOrderService.delete(id);
        return new ResponseEntity<>(
                new SimpleMessageDTO("Pedido do fornecedor deletado com sucesso!"),
                HttpStatus.OK
        );
    }
}
