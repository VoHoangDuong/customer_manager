package com.myShop.service.customer;

import com.myShop.model.Customer;
import com.myShop.service.IGeneralService;

public interface ICustomerService extends IGeneralService<Customer> {
    Iterable<Customer> findAllByOrderByIdDesc();
}
