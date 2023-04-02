package sapo.team3.inventory_manager_service.service;

import sapo.team3.inventory_manager_service.model.response.PagingListResponse;
import sapo.team3.inventory_manager_service.model.response.product.ProductFilterRequest;
import sapo.team3.inventory_manager_service.model.response.product.ProductRequest;
import sapo.team3.inventory_manager_service.model.response.product.ProductResponse;

public interface ProductService {
    ProductResponse getById(long id);

    ProductResponse create(ProductRequest input);

    ProductResponse update(long id, ProductRequest input);

    ProductResponse delete(long id);

    PagingListResponse<ProductResponse> filter(ProductFilterRequest filter);
}
