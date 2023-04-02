package sapo.team3.inventory_manager_service.service;

import sapo.team3.inventory_manager_service.model.response.orders.ListOrderResponse;
import sapo.team3.inventory_manager_service.model.response.orders.OrderFilterRequest;
import sapo.team3.inventory_manager_service.model.response.orders.OrderRequest;
import sapo.team3.inventory_manager_service.model.response.orders.OrderResponse;
import sapo.team3.inventory_manager_service.model.response.serial.SerialResponseWithOrder;

public interface OrderService {
    OrderResponse getById(Integer id);

    ListOrderResponse filter(OrderFilterRequest filter);

    OrderResponse create(OrderRequest input);

    OrderResponse update(OrderRequest input);

    OrderResponse returnOrder(Integer id);

    void delete(Integer id);

    SerialResponseWithOrder getWithOrder(long id);
}
