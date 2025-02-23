package com.erp.management.mapper;

import com.erp.management.DTOs.CustomerDTO;
import com.erp.management.domain.model.Customer;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CustomerMapper {

    Customer customerDtoToCustomer(CustomerDTO customerDTO);
    CustomerDTO customerToCustomerDto(Customer customer);

    Iterable<Customer> customerDtoListToCustomerList (Iterable<CustomerDTO> customerDTOList );
    Iterable<CustomerDTO> customerListTocustomerDtoList (Iterable<Customer> customerList);

}
