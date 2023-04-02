package sapo.team3.inventory_manager_service.controller;

import lombok.extern.apachecommons.CommonsLog;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sapo.team3.inventory_manager_service.model.response.PagingListResponse;
import sapo.team3.inventory_manager_service.model.response.product.ProductFilterRequest;
import sapo.team3.inventory_manager_service.model.response.product.ProductRequest;
import sapo.team3.inventory_manager_service.model.response.product.ProductResponse;
import sapo.team3.inventory_manager_service.service.ProductService;

import javax.validation.Valid;

@CommonsLog
@RestController
@RequestMapping("/admin/products")
@CrossOrigin("http://localhost:3000")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping(value = "/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    public ProductResponse getById(@PathVariable("id") long id) {
        return productService.getById(id);
    }

    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    public PagingListResponse<ProductResponse> filter(@Valid ProductFilterRequest filter) {
        return productService.filter(filter);
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ProductResponse create(@Valid @RequestBody ProductRequest input){
        return productService.create(input);
    }

    @PutMapping(value = "/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ProductResponse update(@PathVariable("id") long id, @Valid @RequestBody ProductRequest input){
        return productService.update(id, input);
    }

    @DeleteMapping(value = "/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ProductResponse delete(@PathVariable("id") long id){
        return productService.delete(id);
    }
}
