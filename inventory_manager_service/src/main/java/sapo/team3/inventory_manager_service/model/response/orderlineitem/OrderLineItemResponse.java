package sapo.team3.inventory_manager_service.model.response.orderlineitem;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class OrderLineItemResponse {
    private int id;
    private Date createdAt;
    private Date modifiedAt;
    private String status;
    private int productId;
    private String name;
    private String description;
    private List<OrderLineItemSerialResponse> serials;
}
