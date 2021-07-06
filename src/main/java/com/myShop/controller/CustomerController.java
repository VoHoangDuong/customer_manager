package com.myShop.controller;

import com.myShop.model.Customer;
import com.myShop.model.Province;
import com.myShop.service.customer.ICustomerService;
import com.myShop.service.province.IProvinceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.Optional;

@RestController
@RequestMapping("/customers")
public class CustomerController {

    @Autowired
    private ICustomerService customerService;

    @Autowired
    private IProvinceService provinceService;

    @ModelAttribute("province")
    public Iterable<Province> province() {
        return provinceService.findAll();
    }

    @GetMapping
    public ResponseEntity<Iterable<Customer>> AllCustomer() {
        return new ResponseEntity<>(customerService.findAll(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Customer> createCustomer(@RequestBody Customer customer ) {
        customer.getProvince().setName(provinceService.findById(customer.getProvince().getId()).get().getName());
        return new ResponseEntity<>(customerService.save(customer), HttpStatus.CREATED);
    }

    @GetMapping("/list")
    public ModelAndView listCustomers() {
        ModelAndView modelAndView = new ModelAndView("/list");
        modelAndView.addObject("s",customerService.findAllByOrderByIdDesc());
        return modelAndView;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Customer> deleteCustomer(@PathVariable Long id) {
        Optional<Customer> customerOptional = customerService.findById(id);
        customerService.remove(id);
        return new ResponseEntity<>(customerOptional.get(), HttpStatus.NO_CONTENT);
    }

    @PostMapping("/edit/{id}")
    public ResponseEntity<Customer> customerResponseEntity(@RequestBody Customer customer,@PathVariable Long id){
        customer.setId(id);
        customer.getProvince().setName(provinceService.findById(customer.getProvince().getId()).get().getName());
        return new ResponseEntity<>(customerService.save(customer),HttpStatus.OK);
    }

    @GetMapping("/api/{id}")
    public ResponseEntity<Customer> showApi(@PathVariable long id){
        Optional<Customer> optional = customerService.findById(id);
        return new ResponseEntity<>(optional.get(),HttpStatus.OK);
    }
}
