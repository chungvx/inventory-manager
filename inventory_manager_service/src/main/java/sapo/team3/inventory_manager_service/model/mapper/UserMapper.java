package sapo.team3.inventory_manager_service.model.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import sapo.team3.inventory_manager_service.model.entity.Role;
import sapo.team3.inventory_manager_service.model.entity.User;
import sapo.team3.inventory_manager_service.model.response.user.UserResponse;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "roles", source = "roles")
    UserResponse entityToResponse(User user);

    default String fromRole(Role role) {
        return role == null ? null : role.getName().toString();
    }
}
