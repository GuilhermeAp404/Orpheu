package com.erp.management.mapper;

import com.erp.management.DTOs.SupplierOrderDTO;
import com.erp.management.domain.model.SupplierOrder;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SupplierOrderMapper {

    SupplierOrder supplierOrderDtoToSupplierOrder(SupplierOrderDTO supplierOrderDTO);
    SupplierOrderDTO supplierOrderToSupplierOrderDto(SupplierOrder supplierOrder);

    Iterable<SupplierOrder> supplierOrderDtoListToSupplierOrderList(Iterable<SupplierOrderDTO> supplierOrderDTOList);
    Iterable<SupplierOrderDTO> supplierOrderListToSupplierOrderDtoList(Iterable<SupplierOrder> supplierOrderList);



}
