package com.erp.management.controller;

import com.erp.management.DTOs.SupplierDTO;
import com.erp.management.DTOs.SimpleMessageDTO;
import com.erp.management.mapper.SupplierMapper;
import com.erp.management.service.impl.SupplierServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("/supplier")
public class SupplierController {
    @Autowired
    private SupplierServiceImpl supplierService;
    @Autowired
    private SupplierMapper supplierMapper;

    @PostMapping
    public ResponseEntity<SimpleMessageDTO> createSupplier(@Valid @RequestBody SupplierDTO supplierDTO){
        supplierService.save(
                supplierMapper.supplierDtoToSupplier(supplierDTO)
        );

        return new ResponseEntity<>(
                new SimpleMessageDTO("Fornecedor criado com sucesso!"),
                HttpStatus.CREATED
        );
    }
    @GetMapping
    public ResponseEntity<Iterable<SupplierDTO>> getAllSuppliers(){
        var suppliersList = supplierMapper.supplierListToSupplierDtoList(
                supplierService.findAll()
        );

        return new ResponseEntity<>(
                suppliersList,
                HttpStatus.OK
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<SupplierDTO> getSupplierById(@PathVariable Long id){
        var supplier = supplierMapper.supplierToSupplierDto(
                supplierService.findById(id)
                        .orElseThrow(()->new NoSuchElementException("Esse fornecedor não existe."))
        );

        return new ResponseEntity<>(
                supplier,
                HttpStatus.OK
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<SimpleMessageDTO> updateSupplier(@PathVariable Long id, @Valid @RequestBody SupplierDTO supplierDTO){
        var updatedSupplier = supplierService.update(
                supplierMapper.supplierDtoToSupplier(supplierDTO),
                id
        );

        return new ResponseEntity<>(
                new SimpleMessageDTO("Fornecerdor atualizado com sucesso!"),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<SimpleMessageDTO> deleteSupplier(@PathVariable Long id){
        supplierService.delete(id);

        return new ResponseEntity<>(
                new SimpleMessageDTO("Fornecedor deletado!"),
                HttpStatus.OK
        );
    }

}
