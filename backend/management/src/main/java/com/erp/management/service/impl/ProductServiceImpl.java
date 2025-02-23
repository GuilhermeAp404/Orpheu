package com.erp.management.service.impl;

import com.erp.management.domain.model.Product;
import com.erp.management.domain.repository.ProductRepository;
import com.erp.management.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Override
    public Iterable<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public Product save(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product update(Product product, Long id) {
        Product productDb = productRepository.findById(id)
                .orElseThrow(()->new NoSuchElementException("Esse produto não existe!"));

        if(!productDb.getProductName().equals(product.getProductName())){
            productDb.setProductName(product.getProductName());
        }

        if(!productDb.getCategory().equals(product.getCategory())){
            productDb.setCategory(product.getCategory());
        }

        if(!productDb.getCostPrice().equals(product.getCostPrice())){
            productDb.setCostPrice(product.getCostPrice());
        }

        if(!productDb.getSellingPrice().equals(product.getSellingPrice())){
            productDb.setSellingPrice(product.getSellingPrice());
        }

        if(!productDb.getAmount().equals(product.getAmount())){
            productDb.setAmount(product.getAmount());
        }

        return productRepository.save(productDb);
    }

    @Override
    public void delete(Long id) {
        Product productDb = productRepository.findById(id)
                .orElseThrow(()->new NoSuchElementException("Esse produto não existe!"));

        productRepository.deleteById(id);
    }
}
