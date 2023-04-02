package sapo.team3.inventory_manager_service.model.mapper;

import org.mapstruct.Mapper;
import sapo.team3.inventory_manager_service.model.entity.OrderLineItems;
import sapo.team3.inventory_manager_service.model.response.orderlineitem.OrderLineItemResponse;

@Mapper(componentModel = "spring")
public interface OrderLineItemMapper {
    OrderLineItemResponse entityToResponse(OrderLineItems lineItems);
}
