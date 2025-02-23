package com.erp.management.service.impl;

import com.erp.management.domain.model.Supplier;
import com.erp.management.domain.repository.SupplierRepository;
import com.erp.management.service.SupplierService;
import com.erp.management.exception.InvalidSupplierRegister;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class SupplierServiceImpl implements SupplierService {
    @Autowired
    private SupplierRepository supplierRepository;

    @Override
    public Iterable<Supplier> findAll() {
        return supplierRepository.findAll();
    }

    @Override
    public Optional<Supplier> findById(Long id) {
        return supplierRepository.findById(id);
    }

    @Override
    public Supplier save(Supplier supplier) {
        if(supplier.getRegister().length()!=14){
            throw new InvalidSupplierRegister("O registro fiscal do fornecedor não foi preenchido corretamente");
        }
        return supplierRepository.save(supplier);
    }

    @Override
    public Supplier update(Supplier supplier, Long id) {
        Supplier supplierDb = supplierRepository.findById(id)
                .orElseThrow(()->new NoSuchElementException("Esse fornecedor não existe!"));

        if(!supplierDb.getName().equals(supplier.getName())){
            supplierDb.setName(supplier.getName());
        }

        if(!supplierDb.getRegister().equals(supplier.getRegister())){
            if(supplier.getRegister().length()!=14){
                throw new InvalidSupplierRegister("O registro fiscal do fornecedor não foi preenchido corretamente");
            }

            supplierDb.setRegister(supplier.getRegister());
        }

        if(!supplierDb.getPhone().equals(supplier.getPhone())){
            supplierDb.setPhone(supplier.getPhone());
        }

        if(!supplierDb.getAddress().equals(supplier.getAddress())){
            supplierDb.setAddress(supplier.getAddress());
        }


        return supplierRepository.save(supplierDb);
    }

    @Override
    public void delete(Long id) {
        Supplier supplierDb = supplierRepository.findById(id)
                .orElseThrow(()->new NoSuchElementException("Esse fornecedor não existe!"));

        supplierRepository.deleteById(id);
    }
}
