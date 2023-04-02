package sapo.team3.inventory_manager_service.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import sapo.team3.inventory_manager_service.model.entity.Serial;

import java.util.List;

@Repository
public interface SerialRepository extends JpaRepository<Serial, Long>, JpaSpecificationExecutor<Serial> {
    List<Serial> findAllByProductId(Long productId);
}
