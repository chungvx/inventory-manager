package sapo.team3.inventory_manager_service.service.impl;

import sapo.team3.inventory_manager_service.model.entity.RoleName;
import sapo.team3.inventory_manager_service.model.entity.Role;
import sapo.team3.inventory_manager_service.model.entity.User;
import sapo.team3.inventory_manager_service.model.jwt.UserPrinciple;
import sapo.team3.inventory_manager_service.model.mapper.UserMapper;
import sapo.team3.inventory_manager_service.model.response.user.UserResponse;
import sapo.team3.inventory_manager_service.repository.RoleRepository;
import sapo.team3.inventory_manager_service.repository.UserRepository;
import sapo.team3.inventory_manager_service.service.UserService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.Set;

/**
 * @author CHUNG
 * @version 1.0
 * @since 15/12/2022
 */

@Service
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserMapper userMapper;

    public UserServiceImpl(UserRepository userRepository,
                           RoleRepository roleRepository,
                           UserMapper userMapper) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.userMapper = userMapper;
    }

    @Override
    public UserResponse getByUsername(String username) {
        var user = userRepository.findByUsername(username).orElseThrow(
                () -> new EntityNotFoundException("Fail! -> Cause: User not find.")
        );
        return userMapper.entityToResponse(user);
    }

    @Override
    public UserResponse saveUser(User user) {
        if(!exitsByEmail(user.getEmail()) && !exitsByUsername(user.getUsername())) {
            var newUSer = userRepository.save(user);
            return userMapper.entityToResponse(newUSer);

        }
        throw new IllegalStateException("Cannot sign up!");
    }

    @Override
    public boolean exitsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public boolean exitsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public void addRoleToUser(User user, RoleName roleName) {
        Role role = roleRepository.findByName(roleName).orElseThrow(
                () -> new EntityNotFoundException("Fail! -> Cause: User Role not find.")
        );
        user.getRoles().add(role);
    }

    @Override
    public void addRolesToUser(User user, Set<String> strRoles) {
        strRoles.forEach(role -> {
            switch(role) {
                case "ROLE_ADMIN":  // người thủ kho
                    addRoleToUser(user, RoleName.ROLE_ADMIN);
                    break;
                default: // nhân viên muốn mượn thiết bị
                    addRoleToUser(user, RoleName.ROLE_USER);
            }
        });
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User Not Found with -> username or email : " + username)
                );

        return UserPrinciple.build(user);
    }

}
