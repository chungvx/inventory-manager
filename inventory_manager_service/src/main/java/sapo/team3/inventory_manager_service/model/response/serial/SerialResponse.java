package sapo.team3.inventory_manager_service.model.response.serial;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class SerialResponse {
    private long id;
    private long productId;
    private String label;
    private String status;
    private Date createdAt;
    private Date modifiedAt;
}
