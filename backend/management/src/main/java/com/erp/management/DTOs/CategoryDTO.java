package com.erp.management.DTOs;

import jakarta.validation.constraints.NotBlank;

public record CategoryDTO(
        Long id,

        @NotBlank(message = "O nome da categoria não pode estar em branco")
        String categoryName
) {
}
