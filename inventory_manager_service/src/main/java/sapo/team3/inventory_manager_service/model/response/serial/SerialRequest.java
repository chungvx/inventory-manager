package sapo.team3.inventory_manager_service.model.response.serial;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
public class SerialRequest {
    private Long id;  // chỉ khi update
    private long productId;
    @NotNull
    @Size(max = 50)
    private String label;
}
