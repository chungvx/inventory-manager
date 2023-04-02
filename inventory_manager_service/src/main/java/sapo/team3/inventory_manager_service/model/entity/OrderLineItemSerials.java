package sapo.team3.inventory_manager_service.model.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import vn.sapo.services.base.dto.CustomBaseEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "OrderLineItemSerials")
@Getter
@Setter
public class OrderLineItemSerials extends CustomBaseEntity {
    private int orderLineItemId;
    private int serialId;
    @Column(name = "CreatedAt", updatable = false)
    @CreationTimestamp
    private Date createdAt;
    @Column(name = "ModifiedAt")
    @UpdateTimestamp
    private Date modifiedAt;
    private String label;

    private String status;
    public enum Status {
        ACTIVE,
        DELETED,
    }
}
