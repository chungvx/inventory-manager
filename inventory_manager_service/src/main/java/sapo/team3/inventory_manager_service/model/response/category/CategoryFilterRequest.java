package sapo.team3.inventory_manager_service.model.response.category;

import lombok.Getter;
import lombok.Setter;
import sapo.team3.inventory_manager_service.model.response.PagingFilterRequest;
import java.util.List;

@Getter
@Setter
public class CategoryFilterRequest extends PagingFilterRequest {
    private List<Long> ids;
    private String query;
    private List<String> statuses;
}