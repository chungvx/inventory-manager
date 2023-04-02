package sapo.team3.inventory_manager_service.model.response.category;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
public class CategoryRequest {
    private Long id;  // chỉ khi update
    @NotNull
    @Size(max = 50)
    private String name;
}
