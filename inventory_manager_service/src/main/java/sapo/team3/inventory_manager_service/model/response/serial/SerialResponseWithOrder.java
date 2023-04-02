package sapo.team3.inventory_manager_service.model.response.serial;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Builder
@Getter
@Setter
public class SerialResponseWithOrder{
    private long id;
    private long productId;
    private String label;
    private String status;
    private Date createdAt;
    private Date modifiedAt;
    private Integer orderId;
    private Integer orderLineItemId;
}
