package sapo.team3.inventory_manager_service.service;

import sapo.team3.inventory_manager_service.model.response.PagingListResponse;
import sapo.team3.inventory_manager_service.model.response.category.CategoryFilterRequest;
import sapo.team3.inventory_manager_service.model.response.category.CategoryRequest;
import sapo.team3.inventory_manager_service.model.response.category.CategoryResponse;

public interface CategoryService {
    CategoryResponse getById(long id);

    CategoryResponse create(CategoryRequest input);

    CategoryResponse update(long id, CategoryRequest input);

    CategoryResponse delete(long id);

    PagingListResponse<CategoryResponse> filter(CategoryFilterRequest filter);
}
