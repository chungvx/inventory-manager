package sapo.team3.inventory_manager_service.model.response.orders;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import sapo.team3.inventory_manager_service.model.response.user.UserResponse;
import vn.sapo.services.base.model.Metadata;

import java.util.List;

@Getter
@Setter
public class Accounts {
    @JsonProperty(value = "accounts")
    private List<UserResponse> accounts;
    private Metadata metadata;
}
