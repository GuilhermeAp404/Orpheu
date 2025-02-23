package com.erp.management.domain.repository;

import com.erp.management.domain.model.Customer;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
@ActiveProfiles("test")
class CustomerRepositoryTest {
    @Autowired
    CustomerRepository customerRepository;

    @Test
    @DisplayName("Criar e Retornar cliente")
    void findCategory(){
        Customer created = this.createCustomer(Customer.builder()
                .customerName("Duponie")
                .address("Rua Pedrinhas, 28")
                .phone("119999999").build());

        var result = customerRepository.findById(created.getId())
                .orElseThrow(()-> new NoSuchElementException("nada encontrado"));

        assertEquals(created.getCustomerName(), result.getCustomerName());
    }

    @Test
    @DisplayName("Buscar lista da cliente")
    void findAllCategories(){
        this.createCustomer(Customer.builder()
                .customerName("Jones Messy")
                .address("Rua Pedrinhas, 28")
                .phone("11999999999").build());

        this.createCustomer(Customer.builder()
                .customerName("Jhonny Silver")
                .address("Rua Pedrinhas, 72")
                .phone("11999999998").build());


        List<Customer> customerList = (List<Customer>) customerRepository.findAll();

        assertFalse(customerList.isEmpty());
        assertEquals(2, customerList.size());
    }

    @Test
    @DisplayName("Atualizar cliente")
    void updateCategories(){
        Customer create = this.createCustomer(Customer.builder()
                .customerName("")
                .address("Rua Pedrinhas, 28")
                .phone("11999999999").build());

        create.setCustomerName("Jhonny Silver");
        customerRepository.save(create);

        Customer db = customerRepository.findById(create.getId()).orElseThrow(()-> new NoSuchElementException("nada encontrado"));

        assertEquals(create.getCustomerName(), db.getCustomerName());
    }

    @Test
    @DisplayName("Deletar cliente")
    void deleteCategories(){
        Customer create = this.createCustomer(Customer.builder()
                .customerName("Jones Messy")
                .address("Rua Pedrinhas, 28")
                .phone("11999999999").build());

        customerRepository.deleteById(create.getId());

        assertThrows(NoSuchElementException.class, ()->{
            customerRepository.findById(create.getId()).orElseThrow(()-> new NoSuchElementException("nada encontrado"));
        });
    }

    private Customer createCustomer(Customer customer){
        return customerRepository.save(customer);
    }
}