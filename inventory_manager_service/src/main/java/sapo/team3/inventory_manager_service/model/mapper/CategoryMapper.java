package sapo.team3.inventory_manager_service.model.mapper;

import org.mapstruct.Mapper;
import sapo.team3.inventory_manager_service.model.entity.Category;
import sapo.team3.inventory_manager_service.model.response.category.CategoryResponse;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    CategoryResponse entityToResponse(Category category);
}