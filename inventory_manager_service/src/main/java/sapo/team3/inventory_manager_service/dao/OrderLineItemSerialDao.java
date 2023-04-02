package sapo.team3.inventory_manager_service.dao;

import sapo.team3.inventory_manager_service.model.entity.OrderLineItemSerials;
import vn.sapo.services.base.dao.BaseDao;

import java.util.List;

public interface OrderLineItemSerialDao  extends BaseDao<OrderLineItemSerials> {
    List<OrderLineItemSerials> findOrderLineItemSerialByOrderLineItemId(Integer orderLineItemId);
    List<OrderLineItemSerials> getBySerial(long serialId);
}
