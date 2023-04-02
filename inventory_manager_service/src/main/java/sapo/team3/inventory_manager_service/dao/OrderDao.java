package sapo.team3.inventory_manager_service.dao;

import sapo.team3.inventory_manager_service.model.entity.Orders;
import sapo.team3.inventory_manager_service.model.response.orders.OrderFilterRequest;
import vn.sapo.services.base.dao.BaseDao;

import java.util.List;

public interface OrderDao extends BaseDao<Orders> {
    List<Orders> filter(OrderFilterRequest model);

    int countOrders(OrderFilterRequest model);
}
