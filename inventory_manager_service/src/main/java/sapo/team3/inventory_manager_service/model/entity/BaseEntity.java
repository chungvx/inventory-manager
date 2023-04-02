package sapo.team3.inventory_manager_service.model.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@MappedSuperclass
@Getter
@Setter
public abstract class BaseEntity implements Serializable {

    private static final long serialVersionUID = -297553281792804396L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "CreatedAt", updatable = false)
    @CreationTimestamp
    private Date createdAt;
    @Column(name = "ModifiedAt")
    @UpdateTimestamp
    private Date modifiedAt;

}
