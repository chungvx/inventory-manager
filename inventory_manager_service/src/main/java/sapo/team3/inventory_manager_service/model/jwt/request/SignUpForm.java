package sapo.team3.inventory_manager_service.model.jwt.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Set;

@Data
@Getter
@Setter
public class SignUpForm {
    @NotBlank
    @Size(min = 3, max = 50, message = "Name must be between {min} and {max}")
    private String name;

    @NotBlank
    @Size(min = 3, max = 50, message = "Username must be between {min} and {max}")
    private String username;

    @NotBlank
    @Size(max = 60, message = "Email must be less than or equal to {max}")
    @Email
    private String email;

    private Set<String> role;

    @NotBlank
    @Size(min = 1, max = 40, message = "Password must be between {min} and {max}")
    private String password;
}
