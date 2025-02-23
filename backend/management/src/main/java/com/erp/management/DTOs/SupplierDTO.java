package com.erp.management.DTOs;

import jakarta.validation.constraints.NotBlank;

public record SupplierDTO(
        Long id,

        @NotBlank(message = "O campo nome não pode estar em branco")
        String name,

        @NotBlank(message = "O registro do fornecedor precisa estar presente")
        String register,

        @NotBlank(message = "O campo telefone não pode estar em branco")
        String phone,

        @NotBlank(message = "O campo de endereço não pode estar em branco")
        String address
) {
}
