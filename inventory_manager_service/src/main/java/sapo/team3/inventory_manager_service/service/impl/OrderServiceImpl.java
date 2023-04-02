package sapo.team3.inventory_manager_service.service.impl;

import lombok.val;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sapo.team3.inventory_manager_service.configuration.utils.ListUtils;
import sapo.team3.inventory_manager_service.dao.OrderDao;
import sapo.team3.inventory_manager_service.dao.OrderLineItemDao;
import sapo.team3.inventory_manager_service.dao.OrderLineItemSerialDao;
import sapo.team3.inventory_manager_service.model.entity.OrderLineItemSerials;
import sapo.team3.inventory_manager_service.model.entity.OrderLineItems;
import sapo.team3.inventory_manager_service.model.entity.Orders;
import sapo.team3.inventory_manager_service.model.mapper.OrderLineItemMapper;
import sapo.team3.inventory_manager_service.model.mapper.OrderMapper;
import sapo.team3.inventory_manager_service.model.response.orderlineitem.OrderLineItemRequest;
import sapo.team3.inventory_manager_service.model.response.orderlineitem.OrderLineItemResponse;
import sapo.team3.inventory_manager_service.model.response.orderlineitem.OrderLineItemSerialResponse;
import sapo.team3.inventory_manager_service.model.response.orders.ListOrderResponse;
import sapo.team3.inventory_manager_service.model.response.orders.OrderFilterRequest;
import sapo.team3.inventory_manager_service.model.response.orders.OrderRequest;
import sapo.team3.inventory_manager_service.model.response.orders.OrderResponse;
import sapo.team3.inventory_manager_service.model.response.serial.SerialResponseWithOrder;
import sapo.team3.inventory_manager_service.repository.*;
import sapo.team3.inventory_manager_service.service.OrderService;
import vn.sapo.services.base.model.Metadata;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {
    private final OrdersRepository ordersRepository;
    private final OrderLineItemRepository orderLineItemRepository;
    private final OrderLineItemSerialsRepository orderLineItemSerialsRepository;
    private final OrderMapper orderMapper;
    private final OrderLineItemMapper orderLineItemMapper;
    private final OrderLineItemDao orderLineItemDao;
    private final OrderDao orderDao;
    private final OrderLineItemSerialDao orderLineItemSerialDao;
    private final SerialRepository serialRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public OrderServiceImpl(OrdersRepository ordersRepository, OrderLineItemRepository orderLineItemRepository, OrderLineItemSerialsRepository orderLineItemSerialsRepository, OrderMapper orderMapper, OrderLineItemMapper orderLineItemMapper, OrderLineItemDao orderLineItemDao, OrderDao orderDao, OrderLineItemSerialDao orderLineItemSerialDao, SerialRepository serialRepository, ProductRepository productRepository, UserRepository userRepository) {
        this.ordersRepository = ordersRepository;
        this.orderLineItemRepository = orderLineItemRepository;
        this.orderLineItemSerialsRepository = orderLineItemSerialsRepository;
        this.orderMapper = orderMapper;
        this.orderLineItemMapper = orderLineItemMapper;
        this.orderLineItemDao = orderLineItemDao;
        this.orderDao = orderDao;
        this.orderLineItemSerialDao = orderLineItemSerialDao;
        this.serialRepository = serialRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Override
    public OrderResponse create(OrderRequest input) {

        Orders order = addOrders(input);
        val orderResponse = getById(order.getId());
        if (orderResponse == null) {
            return null;
        }
        updateSerialToInactive(orderResponse);

        return orderResponse;
    }

    private void updateSerialToInactive(OrderResponse orderResponse){
        // set các serial về trạng thái inactive
        var serialIds = new ArrayList<Integer>();
        orderResponse.getLineItem().stream()
                .forEach(line -> {
                    serialIds.addAll(line.getSerials().stream()
                            .map(OrderLineItemSerialResponse::getSerialId)
                            .collect(Collectors.toList()));
                });
        var serials = serialRepository.findAll();
        var needUpdateSerials = serials.stream()
                .filter(i -> serialIds.stream().anyMatch(ss -> ss == i.getId()))
                .collect(Collectors.toList());
        for (var s : needUpdateSerials) {
            s.setStatus("inactive");
        }
        serialRepository.saveAll(needUpdateSerials);
    }

    @Transactional
    Orders addOrders(OrderRequest input) {
        Orders order = new Orders();
        order.setAccountId(input.getAccountId());
        order.setCreatedAt(new Date());
        order.setModifiedAt(new Date());
        order.setStatus("borrowing");
        order.setNote(input.getNote());
        order.setId(orderDao.generateId("orders_id"));
        orderDao.add(order);
        if (input.getLineItems() != null && input.getLineItems().size() > 0) {
            for (val item : input.getLineItems()) {
                addLineItemOrders(order, item);
            }
        }
        return order;
    }

    @Override
    public OrderResponse update(OrderRequest input) {

        Orders order = updateOrder(input);
        val orderResponse = getById(order.getId());
        if (orderResponse == null) {
            return null;
        }
        updateSerialToInactive(orderResponse);
        return orderResponse;
    }

    @Transactional
    Orders updateOrder(OrderRequest input) {
        Orders order = orderDao.getById(input.getId());
        order.setAccountId(input.getAccountId());
        order.setModifiedAt(new Date());
        order.setNote(input.getNote());
        orderDao.addOrUpdate(order);
        if (input.getLineItems() != null && input.getLineItems().size() > 0) {
            for (val item : input.getLineItems()) {
                if (item.getId() != 0) {
                    OrderLineItems orderLineItems = orderLineItemDao.getById(item.getId());
                    orderLineItems.setModifiedAt(new Date());
                    orderLineItems.setOrderId(order.getId());
                    orderLineItems.setProductId(item.getProductId());
                    orderLineItemDao.addOrUpdate(orderLineItems);
                    if (item.getSerials() != null && item.getSerials().size() > 0) {
                        for (val serial : item.getSerials()) {
                            if (serial.getId() != 0) {
                                OrderLineItemSerials orderLineItemSerials = orderLineItemSerialDao.getById(serial.getId());
                                orderLineItemSerials.setModifiedAt(new Date());
                                orderLineItemSerials.setLabel(serial.getLabel());
                                orderLineItemSerials.setOrderLineItemId(orderLineItems.getId());
                                orderLineItemSerials.setSerialId(serial.getId());
                                orderLineItemSerialDao.addOrUpdate(orderLineItemSerials);
                            } else {
                                OrderLineItemSerials orderLineItemSerials = new OrderLineItemSerials();
                                orderLineItemSerials.setCreatedAt(new Date());
                                orderLineItemSerials.setModifiedAt(new Date());
                                orderLineItemSerials.setLabel(serial.getLabel());
                                orderLineItemSerials.setOrderLineItemId(orderLineItems.getId());
                                orderLineItemSerials.setSerialId(serial.getSerialId());
                                orderLineItemSerials.setStatus("active");
                                orderLineItemSerials.setId(orderDao.generateId("order_line_item_serial_id"));
                                orderLineItemSerialDao.add(orderLineItemSerials);
                            }
                        }
                    }
                } else {
                    addLineItemOrders(order, item);
                }
            }
        }
        return order;
    }

    @Transactional
    void addLineItemOrders(Orders order, OrderLineItemRequest item) {
        OrderLineItems orderLineItems = new OrderLineItems();
        orderLineItems.setCreatedAt(new Date());
        orderLineItems.setModifiedAt(new Date());
        orderLineItems.setOrderId(order.getId());
        orderLineItems.setId(orderDao.generateId("order_line_item_id"));
        orderLineItems.setProductId(item.getProductId());
        orderLineItems.setStatus("active");
        orderLineItemDao.add(orderLineItems);
        if (item.getSerials() != null && item.getSerials().size() > 0) {
            for (val serial : item.getSerials()) {
                OrderLineItemSerials orderLineItemSerials = new OrderLineItemSerials();
                orderLineItemSerials.setCreatedAt(new Date());
                orderLineItemSerials.setModifiedAt(new Date());
                orderLineItemSerials.setLabel(serial.getLabel());
                orderLineItemSerials.setOrderLineItemId(orderLineItems.getId());
                orderLineItemSerials.setSerialId(serial.getSerialId());
                orderLineItemSerials.setStatus("active");
                orderLineItemSerials.setId(orderDao.generateId("order_line_item_serial_id"));
                orderLineItemSerialDao.add(orderLineItemSerials);
            }
        }
    }


    @Override
    public ListOrderResponse filter(OrderFilterRequest filter) {
        ListOrderResponse listOrderResponse = new ListOrderResponse();
        val orders = orderDao.filter(filter);
        val count = orderDao.countOrders(filter);
        Metadata metadata = new Metadata();
        if (orders != null && orders.size() > 0) {
            List<OrderResponse> orderResponses = new ArrayList<>();
            for (val order : orders) {
                val orderResponse = getById(order.getId());
                orderResponses.add(orderResponse);
            }
            listOrderResponse.setOrders(orderResponses);
        }
        metadata.setPage(filter.getPage());
        metadata.setLimit(filter.getLimit());
        metadata.setTotal(count);
        listOrderResponse.setMetadata(metadata);
        return listOrderResponse;
    }


    @Override
    public OrderResponse getById(Integer id) {
        var order = orderDao.getById(id);
        if (order == null) {
            throw new RuntimeException("Không tìm thấy đơn hàng");
        }
        val orderResponse = orderMapper.entityToResponse(order);
        val lineItems = orderLineItemDao.findOrderLineItemByOrderId(order.getId());
        if (lineItems != null) {
            List<OrderLineItemResponse> orderLineItemResponses = new ArrayList<>();
            for (val item : lineItems) {
                val orderItemResponse = mapperOrderLineItemResponse(item);
                orderLineItemResponses.add(orderItemResponse);
            }
            orderResponse.setLineItem(orderLineItemResponses);
        }
        val account = userRepository.findById((long) order.getAccountId());
        if (account.isPresent() && !account.isEmpty()) {
            OrderResponse.AccountResponse accountResponse = new OrderResponse.AccountResponse();
            accountResponse.setEmail(account.get().getEmail());
            accountResponse.setId(account.get().getId());
            accountResponse.setName(account.get().getName());
            orderResponse.setAccount(accountResponse);
        }
        return orderResponse;
    }

    private OrderLineItemResponse mapperOrderLineItemResponse(OrderLineItems item) {
        val orderItemResponse = orderLineItemMapper.entityToResponse(item);
        val product = productRepository.findById((long) item.getProductId());
        if (product != null) {
            orderItemResponse.setName(product.get().getName());
            orderItemResponse.setDescription(product.get().getDescription());
        }
        val orderSerials = orderLineItemSerialDao.findOrderLineItemSerialByOrderLineItemId(item.getId());
        if (orderSerials != null && orderSerials.size() > 0) {
            List<OrderLineItemSerialResponse> listOrderSerials = new ArrayList<>();
            for (val orderSerial : orderSerials) {
                val orderSerialResponse = mapperSerialResponse(item, orderSerial);
                orderSerialResponse.setLabel(orderSerial.getLabel());
                listOrderSerials.add(orderSerialResponse);
                orderItemResponse.setSerials(listOrderSerials);
            }
        }
        return orderItemResponse;
    }

    private OrderLineItemSerialResponse mapperSerialResponse(OrderLineItems item, OrderLineItemSerials orderSerial) {
        OrderLineItemSerialResponse orderSerialResponse = new OrderLineItemSerialResponse();
        orderSerialResponse.setId(orderSerial.getId());
        orderSerialResponse.setCreatedAt(orderSerial.getCreatedAt());
        orderSerialResponse.setModifiedAt(orderSerial.getModifiedAt());
        orderSerialResponse.setOrderLineItemId(orderSerial.getOrderLineItemId());
        orderSerialResponse.setSerialId(orderSerial.getSerialId());
        orderSerialResponse.setStatus(orderSerial.getStatus());
        orderSerialResponse.setProductId(item.getProductId());
        return orderSerialResponse;
    }

    @Override
    public OrderResponse returnOrder(Integer id) {
        val order = orderDao.getById(id);
        if(order.getStatus().equals("returned")){
            throw new RuntimeException("Phiếu mượn thiết bị đã trả");
        }
        order.setStatus("returned");
        order.setReturnedAt(new Date());
        try {
            orderDao.update(order);
        } catch (Exception e) {
            throw new RuntimeException("Trả thiết bị không thành công");
        }
        val orderResponse = getById(id);
        return orderResponse;
    }

    @Override
    public void delete(Integer id) {
        val order = orderDao.getById(id);
        order.setStatus("deleted");
        order.setReturnedAt(new Date());
        try {
            orderDao.update(order);
        } catch (Exception e) {
            throw new RuntimeException("Trả thiết bị không thành công");
        }
    }

    @Override
    public SerialResponseWithOrder getWithOrder(long id) {
        try {
            var lineSerials = orderLineItemSerialDao.getBySerial(id);
            if (lineSerials == null || lineSerials.isEmpty()) return null;
            var line = orderLineItemDao.findOrderLineItemByIds(
                    lineSerials.stream()
                            .map(OrderLineItemSerials::getOrderLineItemId).collect(Collectors.toList()));
            if (line == null || line.isEmpty()) return null;
            var filter = new OrderFilterRequest();
            filter.setIds(ListUtils.joinList(line.stream().map(OrderLineItems::getOrderId).collect(Collectors.toList())));
            filter.setStatuses("borrowing");
            var order = orderDao.filter(filter);
            if (order == null || order.isEmpty()) return null;
            var serial = serialRepository.findById(id).get();
            return SerialResponseWithOrder.builder()
                    .id(serial.getId())
                    .productId(serial.getProductId())
                    .createdAt(serial.getCreatedAt())
                    .modifiedAt(serial.getModifiedAt())
                    .label(serial.getLabel())
                    .status(serial.getStatus())
                    .orderId(order.get(0).getId())
                    .orderLineItemId(line.stream().filter(x -> x.getOrderId() == order.get(0).getId()).findFirst().get().getId())
                    .build();
        } catch (Exception e) {
            return null;
        }
    }
}
