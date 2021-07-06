package com.myShop.repository;

import com.myShop.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICustomerRepository extends JpaRepository<Customer, Long> {
    Iterable<Customer>findAllByOrderByIdDesc();
}
