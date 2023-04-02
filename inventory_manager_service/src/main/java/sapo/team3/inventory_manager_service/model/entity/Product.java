package sapo.team3.inventory_manager_service.model.entity;

import lombok.Getter;
import lombok.Setter;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "Products")
@Getter
@Setter
public class Product  extends BaseEntity {
    private Long categoryId;
    @Size(max = 255)
    private String description;
    @NotNull
    @Size(max = 50)
    private String name;
    @NotNull
    private String status; // ACTIVE và DELETED
}
