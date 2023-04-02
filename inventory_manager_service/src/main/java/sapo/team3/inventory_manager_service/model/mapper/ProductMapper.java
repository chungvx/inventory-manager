package sapo.team3.inventory_manager_service.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import sapo.team3.inventory_manager_service.model.entity.Product;
import sapo.team3.inventory_manager_service.model.response.product.ProductResponse;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    ProductResponse entityToResponse(Product product);
}