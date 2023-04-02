package sapo.team3.inventory_manager_service.controller;

import lombok.extern.apachecommons.CommonsLog;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sapo.team3.inventory_manager_service.model.response.PagingListResponse;
import sapo.team3.inventory_manager_service.model.response.serial.SerialFilterRequest;
import sapo.team3.inventory_manager_service.model.response.serial.SerialRequest;
import sapo.team3.inventory_manager_service.model.response.serial.SerialResponse;
import sapo.team3.inventory_manager_service.model.response.serial.SerialResponseWithOrder;
import sapo.team3.inventory_manager_service.service.OrderService;
import sapo.team3.inventory_manager_service.service.SerialService;

import javax.validation.Valid;

@CommonsLog
@RestController
@RequestMapping("/admin/serials")
@CrossOrigin("http://localhost:3000")
public class SerialController {
    private final SerialService serialService;
    private final OrderService orderService;

    public SerialController(SerialService serialService, OrderService orderService) {
        this.serialService = serialService;
        this.orderService = orderService;
    }

    @GetMapping(value = "/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    public SerialResponse getById(@PathVariable("id") long id) {
        return serialService.getById(id);
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public SerialResponse create(@Valid @RequestBody SerialRequest input){
        return serialService.create(input);
    }

    @PutMapping(value = "/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public SerialResponse update(@PathVariable("id") long id, @Valid @RequestBody SerialRequest input){
        return serialService.update(id, input);
    }

    @DeleteMapping(value = "/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public SerialResponse delete(@PathVariable("id") long id){
        return serialService.delete(id);
    }

    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    public PagingListResponse<SerialResponse> filter(@Valid SerialFilterRequest filter) {
        return serialService.filter(filter);
    }

    @GetMapping(value="/with_order/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    public SerialResponseWithOrder getWithOrder(@PathVariable("id") long id) {
        return orderService.getWithOrder(id);
    }
}
