package com.erp.management.mapper;

import com.erp.management.DTOs.CustomerOrderDTO;
import com.erp.management.domain.model.CustomerOrder;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CustomerOrderMapper {

    CustomerOrder customerOrderDtoToCustomerOrder(CustomerOrderDTO customerOrderDTO);
    CustomerOrderDTO customerOrderToCustomerOrderDto(CustomerOrder customerOrder);

    Iterable<CustomerOrder> customerOrderDtoListToCustomerOrderList(Iterable<CustomerOrderDTO> customerOrderDTOList);
    Iterable<CustomerOrderDTO> customerOrderListToCustomerOrderDtoList(Iterable<CustomerOrder> customerOrderList);



}
