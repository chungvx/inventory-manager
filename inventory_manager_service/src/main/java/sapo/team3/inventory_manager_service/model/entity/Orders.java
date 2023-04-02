package sapo.team3.inventory_manager_service.model.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import vn.sapo.services.base.dto.CustomBaseEntity;

import javax.persistence.Entity;
import java.util.Date;

@Entity
@Getter
@Setter
public class Orders extends CustomBaseEntity {
    private int accountId;
    private Date returnedAt;
    private String note;
    private String status;
    @CreationTimestamp
    private Date createdAt;
    @UpdateTimestamp
    private Date modifiedAt;

    public enum Status {
        BORROWING,
        RETURNED,
    }
}
