package sapo.team3.inventory_manager_service.dao.impl;

import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;
import sapo.team3.inventory_manager_service.dao.OrderDao;
import sapo.team3.inventory_manager_service.model.entity.Orders;
import sapo.team3.inventory_manager_service.model.response.orders.OrderFilterRequest;
import vn.sapo.services.base.dao.impl.BaseDaoImpl;
import vn.sapo.services.base.model.IntResult;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OrderDaoImpl extends BaseDaoImpl<Orders> implements OrderDao {
    private final NamedParameterJdbcTemplate namedParamJdbcTemplate;

    public OrderDaoImpl(NamedParameterJdbcTemplate namedParamJdbcTemplate) {
        super(Orders.class);
        this.namedParamJdbcTemplate = namedParamJdbcTemplate;
    }

    @Override
    public List<Orders> filter(OrderFilterRequest model){
        Map<String, Object> param = new HashMap<>();
        param.put("AccountIds", model.getAccountIds());
        param.put("Statuses", model.getStatuses());
        param.put("Ids", model.getIds());
        param.put("Page", model.getPage());
        param.put("Limit", model.getLimit());
        param.put("Query", model.getQuery());
        param.put("CreatedAtMin", model.getCreatedAtMin());
        param.put("CreatedAtMax", model.getCreatedAtMax());
        param.put("ModifiedAtMin", model.getModifiedAtMin());
        param.put("ModifiedAtMax", model.getModifiedOnMax());
        param.put("ReturnedAtMin", model.getReturnedAtMin());
        param.put("ReturnedAtMax", model.getReturnedOnMax());
        return  querySP("Orders_GetFilter", param);
    }

    @Override
    public int countOrders(OrderFilterRequest model){
        Map<String, Object> param = new HashMap<>();
        param.put("Ids", model.getIds());
        param.put("Statuses", model.getStatuses());
        param.put("AccountIds", model.getAccountIds());
        param.put("Query", model.getQuery());
        param.put("CreatedAtMin", model.getCreatedAtMin());
        param.put("CreatedAtMax", model.getCreatedAtMax());
        param.put("ModifiedAtMin", model.getModifiedAtMin());
        param.put("ModifiedAtMax", model.getModifiedOnMax());
        param.put("ReturnedAtMin", model.getReturnedAtMin());
        param.put("ReturnedAtMax", model.getReturnedOnMax());
        return  querySP("Orders_CountFilter", param, IntResult.class).get(0).getIntResult();
    }
}
