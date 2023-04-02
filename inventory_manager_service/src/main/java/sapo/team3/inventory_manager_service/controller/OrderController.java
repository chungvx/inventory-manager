package sapo.team3.inventory_manager_service.controller;

import lombok.extern.apachecommons.CommonsLog;
import lombok.val;
import org.springframework.web.bind.annotation.*;
import sapo.team3.inventory_manager_service.model.entity.User;
import sapo.team3.inventory_manager_service.model.mapper.UserMapper;
import sapo.team3.inventory_manager_service.model.response.orders.*;
import sapo.team3.inventory_manager_service.model.response.user.UserResponse;
import sapo.team3.inventory_manager_service.repository.UserRepository;
import sapo.team3.inventory_manager_service.service.OrderService;
import vn.sapo.services.base.model.BaseFilterRequest;
import vn.sapo.services.base.model.Metadata;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@CommonsLog
@RestController
@RequestMapping("/admin/orders")
@CrossOrigin("http://localhost:3000")
public class OrderController {
    private final OrderService orderService;
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public OrderController(OrderService orderService, UserRepository userRepository, UserMapper userMapper) {
        this.orderService = orderService;
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @GetMapping(value = "/{id}")
    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    public OrderResponse getById(@PathVariable("id") Integer id) {
        return orderService.getById(id);
    }

    @GetMapping
    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    public ListOrderResponse filter(OrderFilterRequest filter) {
        return orderService.filter(filter);
    }


    //Api tạo đơn mượn
    @PostMapping
    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    public OrderResponse create(@RequestBody OrderRequest input) {
        return orderService.create(input);
    }

    //Api sửa đơn mượn
    @PutMapping(value = "/{id}")
    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    public OrderResponse update(@RequestBody OrderRequest input) {
        return orderService.update(input);
    }


    //Api trả đơn mượn
    @PutMapping(value = "/{id}/return")
    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    public OrderResponse returnOrder(@PathVariable("id") Integer id) {
        return orderService.returnOrder(id);
    }

    //Api xóa đơn mượn
    @DeleteMapping(value = "/{id}/delete")
    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    public void delete(@PathVariable("id") Integer id) {
         orderService.delete(id);
    }

    @GetMapping(value = "/accounts")
    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    public Accounts getAllAccount(BaseFilterRequest filter) {
        Accounts accountResponses = new Accounts();
        List<UserResponse> accountRess = new ArrayList<>();
        val accounts = userRepository.findAll().stream().filter(i -> i.getId() != 6).collect(Collectors.toList());
        if(accounts != null){
            for (val account: accounts) {
                val accountResponse = userMapper.entityToResponse(account);
                accountRess.add(accountResponse);
            }
        }
        accountResponses.setAccounts(accountRess);
        Metadata metadata = new Metadata();
        metadata.setTotal(accounts.size());
        metadata.setLimit(filter.getLimit());
        metadata.setPage(filter.getPage());
        accountResponses.setMetadata(metadata);
        return accountResponses;
    }
}
