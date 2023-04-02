package sapo.team3.inventory_manager_service.model.response.category;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class CategoryResponse {
    private long id;
    private String name;
    private String status;
    private Date createdAt;
    private Date modifiedAt;
}
