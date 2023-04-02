package sapo.team3.inventory_manager_service.model.response.orders;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.Getter;
import lombok.Setter;
import vn.sapo.services.base.model.Metadata;

import java.util.List;
@Getter
@Setter
@JsonRootName(value = "list_orders")
public class ListOrderResponse {
    @JsonProperty(value = "orders")
    private List<OrderResponse> orders;
    private Metadata metadata;
}
