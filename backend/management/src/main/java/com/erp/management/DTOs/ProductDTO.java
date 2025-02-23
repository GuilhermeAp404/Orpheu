package com.erp.management.DTOs;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ProductDTO(
        Long id,

        @NotBlank(message = "O nome do produto não pode estar em branco")
        String productName,

        @NotNull(message = "O produto precisa ter uma categoria")
        CategoryDTO category,

        @NotNull(message = "O preço de custo é obrigatorio")
        Double costPrice,

        @NotNull(message = "O preço de venda é obrigatorio")
        Double sellingPrice,

        Integer amount
) {
}
