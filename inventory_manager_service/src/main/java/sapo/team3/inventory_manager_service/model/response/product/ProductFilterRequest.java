package sapo.team3.inventory_manager_service.model.response.product;

import lombok.Getter;
import lombok.Setter;
import sapo.team3.inventory_manager_service.model.response.PagingFilterRequest;
import java.util.List;

@Getter
@Setter
public class ProductFilterRequest extends PagingFilterRequest {
    private List<Long> ids;
    private String query;
    private List<String> statuses;
    private Long category_id;
    private Boolean stock;
}