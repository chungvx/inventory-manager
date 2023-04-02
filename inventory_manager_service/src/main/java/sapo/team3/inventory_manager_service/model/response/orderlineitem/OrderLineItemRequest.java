package sapo.team3.inventory_manager_service.model.response.orderlineitem;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;
@Getter
@Setter
public class OrderLineItemRequest {
    private int id;
    private int productId;
    private List<SerialRequest> serials;

    @Getter
    @Setter
    public static class SerialRequest {
        private int id;
        private int serialId;
        private String label;
    }
}
