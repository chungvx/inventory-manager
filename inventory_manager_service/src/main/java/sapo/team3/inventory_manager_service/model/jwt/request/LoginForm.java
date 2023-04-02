package sapo.team3.inventory_manager_service.model.jwt.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@Getter
@Setter
public class LoginForm {
    @NotBlank
    @Size(min = 3, max = 60, message = "Username must be between {min} and {max}")
    private String username;

    @NotBlank
    @Size(min = 1, max = 40, message = "Password must be between {min} and {max}")
    private String password;

}