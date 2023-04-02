package sapo.team3.inventory_manager_service.model.response.orders;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.Getter;
import lombok.Setter;
import sapo.team3.inventory_manager_service.model.response.orderlineitem.OrderLineItemRequest;

import javax.validation.constraints.Size;
import java.util.List;

@Getter
@Setter
public class OrderRequest {
    private int id;
    private int accountId;
    @Size(max = 255)
    private String note;
    private String status;
    private List<OrderLineItemRequest> lineItems;
}
