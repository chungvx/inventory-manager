package sapo.team3.inventory_manager_service.controller;

import sapo.team3.inventory_manager_service.model.jwt.request.LoginForm;
import sapo.team3.inventory_manager_service.model.jwt.request.SignUpForm;
import sapo.team3.inventory_manager_service.model.jwt.response.JwtResponse;
import sapo.team3.inventory_manager_service.model.entity.User;
import sapo.team3.inventory_manager_service.model.jwt.response.LoginResponse;
import sapo.team3.inventory_manager_service.configuration.security.jwt.JwtProvider;
import sapo.team3.inventory_manager_service.model.response.user.UserResponse;
import sapo.team3.inventory_manager_service.service.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/admin/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;

    private final UserService userService;

    private final PasswordEncoder encoder;

    private final JwtProvider jwtProvider;

    public AuthController(AuthenticationManager authenticationManager, UserService userService, PasswordEncoder encoder, JwtProvider jwtProvider) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.encoder = encoder;
        this.jwtProvider = jwtProvider;
    }


//    {
//        "username": "admin",
//        "password": "admin"
//    }
//        => Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTYzMzg3NTc1MCwiZXhwIjoxNjMzODc1ODM3fQ.-Bs7ho_D58QQcbtBnBhmBjRTXQtu4Kl-QEMQ24haMCUGHmGYwKvqFCJUJ2NEHmFvUd-zg5pUtPTLDZC1xpbRNg
    @PostMapping("/login")
    public LoginResponse authenticateUser(@Valid @RequestBody LoginForm loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtProvider.generateJwtToken(authentication);
        var userResponse = userService.getByUsername(loginRequest.getUsername());
        var response = new LoginResponse();
        response.setToken(new JwtResponse(jwt));
        response.setUser(userResponse);
        return response;
    }




//    {
//        "name": "chung",
//            "username": "admin",
//            "email": "admin@gmail.com",
//            "role": [ "ROLE_ADMIN"], // ROLE_USER
//        "password": "admin"
//    }
//
    @PostMapping("/register")
    public UserResponse registerUser(@Valid @RequestBody SignUpForm signUpRequest) {

        // Creating user's account
        User user = new User(signUpRequest.getName(), signUpRequest.getUsername(),
                signUpRequest.getEmail(), encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRole();
        userService.addRolesToUser(user, strRoles);
        return userService.saveUser(user);
    }
}