package sapo.team3.inventory_manager_service.model.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import vn.sapo.services.base.dto.CustomBaseEntity;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "OrderLineItems")
@Getter
@Setter
public class OrderLineItems extends CustomBaseEntity {
    private int orderId;
    private int productId;
    @CreationTimestamp
    private Date createdAt;
    @UpdateTimestamp
    private Date modifiedAt;

    private String status;
    public enum Status {
        ACTIVE,
        DELETED,
    }
}
