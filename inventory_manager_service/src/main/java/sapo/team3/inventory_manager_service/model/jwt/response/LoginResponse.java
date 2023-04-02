package sapo.team3.inventory_manager_service.model.jwt.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import sapo.team3.inventory_manager_service.model.response.user.UserResponse;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
    private JwtResponse token;
    private UserResponse user;
}
