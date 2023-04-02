package sapo.team3.inventory_manager_service.dao.impl;

import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import sapo.team3.inventory_manager_service.dao.OrderLineItemSerialDao;
import sapo.team3.inventory_manager_service.model.entity.OrderLineItemSerials;
import vn.sapo.services.base.dao.impl.BaseDaoImpl;

import java.util.List;

@Repository
public class OrderLineItemSerialDaoImpl extends BaseDaoImpl<OrderLineItemSerials> implements OrderLineItemSerialDao {
    private final NamedParameterJdbcTemplate namedParamJdbcTemplate;

    public OrderLineItemSerialDaoImpl(NamedParameterJdbcTemplate namedParamJdbcTemplate) {
        super(OrderLineItemSerials.class);
        this.namedParamJdbcTemplate = namedParamJdbcTemplate;
    }

    @Override
    public List<OrderLineItemSerials> findOrderLineItemSerialByOrderLineItemId(Integer orderLineItemId){
        return query("select * from OrderLineItemSerials where OrderLineItemId = ? ", new Object[]{orderLineItemId});
    }

    @Override
    public List<OrderLineItemSerials> getBySerial(long serialId){
        return query("select * from OrderLineItemSerials where Status = 'active' and SerialId = ?  ", new Object[]{serialId});

    }

}
