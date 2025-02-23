package com.erp.management.DTOs;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.Date;
import java.util.List;

public record SupplierOrderDTO(
        Long id,

        @NotNull(message = "O fornecedor não está presente")
        SupplierDTO supplier,

        @NotEmpty(message = "A lista de produtos não pode estar vázia")
        List<OrderProductDTO> supplierOrderProducts,

        Date orderDate,

        @NotNull(message = "O total do pedido precisa ser enviado")
        Double total
) {
}
