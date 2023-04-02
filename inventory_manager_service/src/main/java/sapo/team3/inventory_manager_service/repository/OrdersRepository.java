package sapo.team3.inventory_manager_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sapo.team3.inventory_manager_service.model.entity.Orders;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, Long> {
}
