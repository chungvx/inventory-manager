package sapo.team3.inventory_manager_service.model.response.product;

import lombok.Getter;
import lombok.Setter;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Getter
@Setter
public class ProductRequest {
    private Long id;  // chỉ khi update
    private Long categoryId;
    @Size(max = 255)
    private String description;
    @NotNull
    @Size(max = 50)
    private String name;
    private List<String> serials;
}
