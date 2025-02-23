package com.erp.management.controller;
import com.erp.management.DTOs.ProductDTO;
import com.erp.management.DTOs.SimpleMessageDTO;
import com.erp.management.mapper.ProductMapper;
import com.erp.management.service.impl.ProductServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
@RequestMapping(value = "/product")
public class ProductController {
    @Autowired
    private ProductServiceImpl productService;
    @Autowired
    private ProductMapper productMapper;

    @PostMapping
    public ResponseEntity<SimpleMessageDTO> createProduct(@Valid @RequestBody ProductDTO productDTO){
        productService.save(
                productMapper.productDtoToProduct(productDTO)
        );

        return new ResponseEntity<>(
                new SimpleMessageDTO("Produto criado com sucesso!"),
                HttpStatus.CREATED
        );
    };

    @GetMapping
    public ResponseEntity<Iterable<ProductDTO>> getAllProducts(){
        var productLists = productMapper.productListToProductDtoList(
                productService.findAll()
        );

        return new ResponseEntity<>(
                productLists,
                HttpStatus.OK
        );
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id){
        var product = productMapper.productToProductDto(
                productService.findById(id).orElseThrow(()-> new NoSuchElementException("Esse produto não existe."))
        );

        return new ResponseEntity<>(
                product,
                HttpStatus.OK
        );
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<SimpleMessageDTO> updateProduct(@Valid @RequestBody ProductDTO productDTO, @PathVariable Long id){
        productService.update(
                productMapper.productDtoToProduct(productDTO),
                id
        );
        return new ResponseEntity<>(
                new SimpleMessageDTO("Produto atualizado com sucesso!"),
                HttpStatus.OK
        );
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<SimpleMessageDTO> deleteProduct(@PathVariable Long id){
        productService.delete(id);

        return new ResponseEntity<>(
                new SimpleMessageDTO("Produto deletado!"),
                HttpStatus.OK
        );
    }
}
