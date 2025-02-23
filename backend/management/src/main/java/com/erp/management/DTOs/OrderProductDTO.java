package com.erp.management.DTOs;

import jakarta.validation.constraints.NotNull;

public record OrderProductDTO(
        @NotNull
        ProductToOrderDTO product,

        @NotNull
        Integer quantity,

        Double totalCost
){
}
