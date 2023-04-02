package sapo.team3.inventory_manager_service.model.response.product;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ProductResponse {
    private long id;
    private Long categoryId;
    private String description;
    private String name;
    private String status;
    private Date createdAt;
    private Date modifiedAt;
    private long quantityStock; // Số lượng serial còn trống
    private long quantityNotStock; // Số lượng serial đang cho mượn
}
