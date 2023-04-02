package sapo.team3.inventory_manager_service.model.response.orders;

import lombok.Getter;
import lombok.Setter;
import sapo.team3.inventory_manager_service.model.response.PagingFilterRequest;


@Getter
@Setter
public class OrderFilterRequest extends PagingFilterRequest {
    private String ids;
    private String query;
    private String accountIds;
    private String statuses;
    private String createdAtMin;
    private String createdAtMax;
    private String modifiedAtMin;
    private String modifiedOnMax;
    private String returnedAtMin;
    private String returnedOnMax;
}
