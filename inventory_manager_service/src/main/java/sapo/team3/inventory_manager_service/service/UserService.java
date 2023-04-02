package sapo.team3.inventory_manager_service.service;

import sapo.team3.inventory_manager_service.model.entity.RoleName;
import sapo.team3.inventory_manager_service.model.entity.User;
import sapo.team3.inventory_manager_service.model.response.user.UserResponse;

import java.util.Set;

/**
 * @author CHUNG
 * @version 1.0
 * @since 15/12/2022
 */
public interface UserService {
    UserResponse getByUsername(String username);
    UserResponse saveUser(User user);
    boolean exitsByUsername(String username);
    boolean exitsByEmail(String email);
    void addRoleToUser(User user, RoleName roleName);
    void addRolesToUser(User user, Set<String> strRoles);
}
