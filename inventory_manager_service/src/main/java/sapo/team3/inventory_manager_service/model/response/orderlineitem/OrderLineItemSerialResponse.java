package sapo.team3.inventory_manager_service.model.response.orderlineitem;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;
@Getter
@Setter
public class OrderLineItemSerialResponse {
    private int id;
    private int orderLineItemId;
    private int productId;
    private int serialId;
    private String label;
    private Date createdAt;
    private Date modifiedAt;
    private String status;
}
