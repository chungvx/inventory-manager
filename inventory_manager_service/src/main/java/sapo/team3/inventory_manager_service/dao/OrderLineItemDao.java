package sapo.team3.inventory_manager_service.dao;

import sapo.team3.inventory_manager_service.model.entity.OrderLineItems;
import sapo.team3.inventory_manager_service.model.entity.Orders;
import vn.sapo.services.base.dao.BaseDao;

import java.util.List;

public interface OrderLineItemDao extends BaseDao<OrderLineItems> {
    List<OrderLineItems> findOrderLineItemByOrderId(Integer orderId);
    List<OrderLineItems> findOrderLineItemByIds(List<Integer> ids);
}
