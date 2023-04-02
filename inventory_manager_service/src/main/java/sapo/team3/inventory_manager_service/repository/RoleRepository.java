package sapo.team3.inventory_manager_service.repository;

import sapo.team3.inventory_manager_service.model.entity.RoleName;
import sapo.team3.inventory_manager_service.model.entity.Role;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);
}
