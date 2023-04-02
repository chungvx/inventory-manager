package sapo.team3.inventory_manager_service.model.entity;

import lombok.Getter;
import lombok.Setter;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
@Entity
@Table(name = "Serials")
@Getter
@Setter
public class Serial extends BaseEntity {
    @Min(1)
    private long productId;
    @NotNull
    @Size(max = 50)
    private String label;
    @NotNull
    private String status;
    // ACTIVE: sp serial chưa có ai mượn, có thể cho mượn
    // INACTIVE: sp serial đã có người mượn, không thể cho mượn
    // DELETED: sp serial đã bị xóa, không thể cho mượn
}
