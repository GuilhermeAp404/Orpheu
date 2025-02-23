package com.erp.management.DTOs;

public record ProductToOrderDTO(
        Long id,
        String productName,
        CategoryDTO category,
        Double costPrice,
        Double sellingPrice) {
}
