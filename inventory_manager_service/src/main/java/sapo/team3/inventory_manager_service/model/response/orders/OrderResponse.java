package sapo.team3.inventory_manager_service.model.response.orders;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.Getter;
import lombok.Setter;
import sapo.team3.inventory_manager_service.model.response.orderlineitem.OrderLineItemResponse;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@JsonRootName(value = "orders")
public class OrderResponse {
    private int id;
    private Date createdAt;
    private Date modifiedAt;
    private Date returnedAt;
    private String note;
    private String status;
    private AccountResponse account;
    private List<OrderLineItemResponse> lineItem;

    @Getter
    @Setter
    public static class AccountResponse {
        private Long id;
        private String name;
        private String phone;
        private String email;
    }
}
