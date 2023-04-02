package sapo.team3.inventory_manager_service.model.response.user;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class UserResponse {
    private long id;
    private String name;
    private String username;
    private String email;
    private String[] roles;
    private Date createdAt;
    private Date modifiedAt;
}
