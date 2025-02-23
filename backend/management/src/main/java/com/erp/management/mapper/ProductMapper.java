package com.erp.management.mapper;

import com.erp.management.DTOs.CategoryDTO;
import com.erp.management.DTOs.ProductDTO;
import com.erp.management.domain.model.Product;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    Product productDtoToProduct(ProductDTO productDTO);
    ProductDTO productToProductDto(Product category);

    Iterable<Product> productDtoListToProductList(Iterable<CategoryDTO> productDTOList);
    Iterable<ProductDTO> productListToProductDtoList(Iterable<Product> productList);



}
