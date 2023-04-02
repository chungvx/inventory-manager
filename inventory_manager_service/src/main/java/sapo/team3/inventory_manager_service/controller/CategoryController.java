package sapo.team3.inventory_manager_service.controller;

import lombok.extern.apachecommons.CommonsLog;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sapo.team3.inventory_manager_service.model.response.PagingListResponse;
import sapo.team3.inventory_manager_service.model.response.category.CategoryFilterRequest;
import sapo.team3.inventory_manager_service.model.response.category.CategoryRequest;
import sapo.team3.inventory_manager_service.model.response.category.CategoryResponse;
import sapo.team3.inventory_manager_service.service.CategoryService;

import javax.validation.Valid;

@CommonsLog
@RestController
@RequestMapping("/admin/categories")
@CrossOrigin("http://localhost:3000")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping(value = "/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    public CategoryResponse getById(@PathVariable("id") long id) {
        return categoryService.getById(id);
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public CategoryResponse create(@Valid @RequestBody CategoryRequest input){
        return categoryService.create(input);
    }

    @PutMapping(value = "/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public CategoryResponse update(@PathVariable("id") long id, @Valid @RequestBody CategoryRequest input){
        return categoryService.update(id, input);
    }

    @DeleteMapping(value = "/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public CategoryResponse delete(@PathVariable("id") long id){
        return categoryService.delete(id);
    }

    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    public PagingListResponse<CategoryResponse> filter(@Valid CategoryFilterRequest filter) {
        return categoryService.filter(filter);
    }
}
