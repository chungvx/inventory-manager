package sapo.team3.inventory_manager_service.dao.impl;

import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;
import sapo.team3.inventory_manager_service.configuration.utils.ListUtils;
import sapo.team3.inventory_manager_service.dao.OrderLineItemDao;
import sapo.team3.inventory_manager_service.model.entity.OrderLineItems;
import sapo.team3.inventory_manager_service.model.entity.Orders;
import vn.sapo.services.base.dao.impl.BaseDaoImpl;

import java.util.List;

@Service
public class OrderLineItemDaoImpl extends BaseDaoImpl<OrderLineItems> implements OrderLineItemDao {
    private final NamedParameterJdbcTemplate namedParamJdbcTemplate;

    public OrderLineItemDaoImpl(NamedParameterJdbcTemplate namedParamJdbcTemplate) {
        super(OrderLineItems.class);
        this.namedParamJdbcTemplate = namedParamJdbcTemplate;
    }

    @Override
    public List<OrderLineItems> findOrderLineItemByOrderId(Integer orderId){
        return query("select * from OrderLineItems where OrderId = ? ", new Object[]{orderId});
    }

    @Override
    public List<OrderLineItems> findOrderLineItemByIds(List<Integer> ids){
        String query = "SELECT * FROM OrderLineItems WHERE Status = 'active' AND Id in (%s)";
        query = String.format(query, ListUtils.joinList(ids));
        return query(query, new Object[]{});
    }
}
