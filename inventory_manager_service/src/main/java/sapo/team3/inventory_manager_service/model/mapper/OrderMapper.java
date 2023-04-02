package sapo.team3.inventory_manager_service.model.mapper;

import org.mapstruct.Mapper;
import sapo.team3.inventory_manager_service.model.entity.Orders;
import sapo.team3.inventory_manager_service.model.response.orders.OrderResponse;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    OrderResponse entityToResponse(Orders orders);
}
