package sapo.team3.inventory_manager_service.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import sapo.team3.inventory_manager_service.configuration.utils.Status;
import sapo.team3.inventory_manager_service.model.entity.Product;
import sapo.team3.inventory_manager_service.model.entity.Serial;
import sapo.team3.inventory_manager_service.model.mapper.SerialMapper;
import sapo.team3.inventory_manager_service.model.response.PagingListResponse;
import sapo.team3.inventory_manager_service.model.response.serial.SerialFilterRequest;
import sapo.team3.inventory_manager_service.model.response.serial.SerialRequest;
import sapo.team3.inventory_manager_service.model.response.serial.SerialResponse;
import sapo.team3.inventory_manager_service.model.response.serial.SerialResponseWithOrder;
import sapo.team3.inventory_manager_service.repository.*;
import sapo.team3.inventory_manager_service.service.SerialService;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.stream.Collectors;

@Service
public class SerialServiceImpl implements SerialService {
    private final SerialRepository serialRepository;
    private final ProductRepository productRepository;
    private final SerialMapper serialMapper;
    private final FilterRepository<Serial> filterRepository;

    public SerialServiceImpl(SerialRepository serialRepository,
                             ProductRepository productRepository,
                             SerialMapper serialMapper,
                             FilterRepository<Serial> filterRepository) {
        this.serialRepository = serialRepository;
        this.productRepository = productRepository;
        this.serialMapper = serialMapper;
        this.filterRepository = filterRepository;
    }

    @Override
    public SerialResponse getById(long id) {
        var serial = serialRepository.getOne(id);
        return serialMapper.entityToResponse(serial);
    }

    @Override
    public SerialResponse create(SerialRequest input) {
        var serial = new Serial();
        if (input.getProductId() > 0) {
            var pro = productRepository.findById(input.getProductId());
            if (pro.isPresent()) {
                serial.setProductId(input.getProductId());
            } else {
                throw new EntityNotFoundException("Product not found");
            }
        }
        serial.setLabel(input.getLabel());
        serial.setStatus(Status.ACTIVE);

        var newSerial = serialRepository.save(serial);
        return serialMapper.entityToResponse(newSerial);
    }

    @Override
    public SerialResponse update(long id, SerialRequest input) {
        var serial = serialRepository.getOne(id);
        if (input.getProductId() > 0) {
            if (input.getProductId() != serial.getProductId()) {
                var pro = productRepository.findById(input.getProductId());
                if (!pro.isPresent()) {
                    throw new EntityNotFoundException("Product not found");
                }
                serial.setProductId(input.getProductId());
            }
        }
        serial.setLabel(input.getLabel());

        var newSerial = serialRepository.save(serial);
        return serialMapper.entityToResponse(newSerial);
    }

    @Override
    public SerialResponse delete(long id) {
        var serial = serialRepository.getOne(id);
        if (serial.getStatus().equals(Status.DELETED)) {
            throw new RuntimeException("Sp đã xóa rồi");
        }
        serial.setStatus(Status.DELETED);
        var newSerial = serialRepository.save(serial);
        return serialMapper.entityToResponse(newSerial);
    }

    @Override
    public PagingListResponse<SerialResponse> filter(SerialFilterRequest filter) {
        Pageable pageable = PageRequest.of(
                filter.getPage() - 1,
                filter.getLimit(),
                Sort.by(Sort.Direction.DESC, "id"));

        var filters = new ArrayList<Filter>();
        if (filter.getIds() != null && !filter.getIds().isEmpty()) {
            Filter ids = Filter.builder()
                    .field("id")
                    .operator(QueryOperator.IN)
                    .values(filter.getIds().stream().map(Object::toString).collect(Collectors.toList()))
                    .build();
            filters.add(ids);
        }
        if (filter.getQuery() != null && !filter.getQuery().isEmpty()) {
            Filter query = Filter.builder()
                    .field("label")
                    .operator(QueryOperator.LIKE)
                    .value(filter.getQuery())
                    .build();
            filters.add(query);
        }
        if (filter.getStatuses() != null && !filter.getStatuses().isEmpty()) {
            Filter statuses = Filter.builder()
                    .field("status")
                    .operator(QueryOperator.IN)
                    .values(filter.getStatuses())
                    .build();
            filters.add(statuses);
        }
        if (filter.getProduct_ids() != null) {
            Filter productIds = Filter.builder()
                    .field("productId")
                    .operator(QueryOperator.IN)
                    .values(filter.getProduct_ids().stream().map(Object::toString).collect(Collectors.toList()))
                    .build();
            filters.add(productIds);
        }
        Page<Serial> results;
        if (filters.size() > 0)
            results = serialRepository.findAll(filterRepository.getSpecificationFromFilters(filters), pageable);
        else results = serialRepository.findAll(pageable);
        var data = results.getContent().stream().map(serialMapper::entityToResponse).collect(Collectors.toList());
        return new PagingListResponse<>(
                data,
                new PagingListResponse.Metadata(filter.getPage(), filter.getLimit(), results.getTotalElements()));

    }
}
