package sapo.team3.inventory_manager_service.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import sapo.team3.inventory_manager_service.configuration.utils.Status;
import sapo.team3.inventory_manager_service.model.entity.Product;
import sapo.team3.inventory_manager_service.model.entity.Serial;
import sapo.team3.inventory_manager_service.model.mapper.ProductMapper;
import sapo.team3.inventory_manager_service.model.response.PagingListResponse;
import sapo.team3.inventory_manager_service.model.response.product.ProductFilterRequest;
import sapo.team3.inventory_manager_service.model.response.product.ProductRequest;
import sapo.team3.inventory_manager_service.model.response.product.ProductResponse;
import sapo.team3.inventory_manager_service.model.response.serial.SerialFilterRequest;
import sapo.team3.inventory_manager_service.repository.*;
import sapo.team3.inventory_manager_service.service.ProductService;
import sapo.team3.inventory_manager_service.service.SerialService;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;
    private final FilterRepository<Product> filterRepository;
    private final SerialService serialService;
    private final SerialRepository serialRepository;

    public ProductServiceImpl(ProductRepository productRepository,
                              CategoryRepository categoryRepository,
                              ProductMapper productMapper,
                              FilterRepository<Product> filterRepository,
                              SerialService serialService,
                              SerialRepository serialRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.productMapper = productMapper;
        this.filterRepository = filterRepository;
        this.serialService = serialService;
        this.serialRepository = serialRepository;
    }

    @Override
    public ProductResponse getById(long id) {
        var product = productRepository.getOne(id);
        var response = productMapper.entityToResponse(product);
        var serialDomains = serialRepository.findAllByProductId(product.getId());
        response.setQuantityStock(serialDomains.stream().filter(serial -> serial.getStatus().equals(Status.ACTIVE)).count());
        response.setQuantityNotStock(serialDomains.stream().filter(serial -> serial.getStatus().equals(Status.INACTIVE)).count());
        return response;
    }

    @Override
    public ProductResponse create(ProductRequest input) {
        var product = new Product();
        if (input.getCategoryId() != null && input.getCategoryId() > 0) {
            var cate = categoryRepository.findById(input.getCategoryId());
            if (cate.isPresent()) {
                product.setCategoryId(input.getCategoryId());
            } else {
                throw new EntityNotFoundException("Category not found");
            }
        }
        product.setName(input.getName());
        product.setDescription(input.getDescription());
        product.setStatus(Status.ACTIVE);

        var newProduct = productRepository.save(product);
        var quantitySerialStock = 0;
        if (input.getSerials() != null && input.getSerials().size() > 0) {
            var serials = new ArrayList<Serial>();
            for (var label : input.getSerials()) {
                var serial = new Serial();
                serial.setLabel(label);
                serial.setProductId(newProduct.getId());
                serial.setStatus(Status.ACTIVE);
                serials.add(serial);
            }
            if (serials.size() > 0) {
                serialRepository.saveAll(serials);
                quantitySerialStock = serials.size();
            }
        }
        var response = productMapper.entityToResponse(newProduct);
        response.setQuantityStock(quantitySerialStock);
        response.setQuantityNotStock(0);
        return response;
    }

    @Override
    public ProductResponse update(long id, ProductRequest input) {
        var product = productRepository.getOne(id);
        if (input.getCategoryId() != null && input.getCategoryId() > 0) {
            if (product.getCategoryId() == null || !input.getCategoryId().equals(product.getCategoryId())) {
                var cate = categoryRepository.findById(input.getCategoryId());
                if (!cate.isPresent()) {
                    throw new EntityNotFoundException("Category not found");
                }
                product.setCategoryId(input.getCategoryId());
            }
        }
        product.setName(input.getName());
        product.setDescription(input.getDescription());

        var newProduct = productRepository.save(product);
        var serialDomains = serialRepository.findAllByProductId(newProduct.getId());

        if (input.getSerials() != null && input.getSerials().size() > 0) {
            // tạo mới serials
            var newSerials = input.getSerials()
                    .stream().filter(serial -> serialDomains.stream().noneMatch(serialDomain ->
                            !serialDomain.getStatus().equals(Status.DELETED)
                                    && serialDomain.getLabel().equals(serial)))
                    .collect(Collectors.toList());
            for (var label : newSerials) {
                var serial = new Serial();
                serial.setLabel(label);
                serial.setProductId(newProduct.getId());
                serial.setStatus(Status.ACTIVE);
                serialDomains.add(serial);
            }

            // xóa serials
            var deleteSerials = serialDomains
                    .stream().filter(serialDomain ->
                            !input.getSerials().contains(serialDomain.getLabel())
                                    && !serialDomain.getStatus().equals(Status.DELETED))
                    .collect(Collectors.toList());
            for (var serial : deleteSerials) {
                serial.setStatus(Status.DELETED);
            }
        } else {
            for (var serial : serialDomains) {
                serial.setStatus(Status.DELETED);
            }
        }
        var response = productMapper.entityToResponse(newProduct);;
        if (serialDomains.size() > 0) {
            serialRepository.saveAll(serialDomains);
            response.setQuantityStock(serialDomains.stream().filter(serial -> serial.getStatus().equals(Status.ACTIVE)).count());
            response.setQuantityNotStock(serialDomains.stream().filter(serial -> serial.getStatus().equals(Status.INACTIVE)).count());
        }
        return response;
    }

    @Override
    public ProductResponse delete(long id) {
        var product = productRepository.getOne(id);
        if (product.getStatus().equals(Status.DELETED)) {
            throw new RuntimeException("Sp đã xóa rồi");
        }
        product.setStatus(Status.DELETED);
        var newProduct = productRepository.save(product);
        return productMapper.entityToResponse(newProduct);
    }

    @Override
    public PagingListResponse<ProductResponse> filter(ProductFilterRequest filter) {
        Pageable pageable = PageRequest.of(
                filter.getPage() - 1,
                filter.getLimit(),
                Sort.by(Sort.Direction.DESC, "id"));
        List<Long> idsStock = new ArrayList<>();
        if (filter.getStock() != null) {
            if (filter.getStock()) {
                List<Product> prds = productRepository.findByStock();
                prds.forEach(product ->
                        idsStock.add(product.getId()));
            } else {
                List<Product> prds = productRepository.findByNotStock();
                prds.forEach(product ->
                        idsStock.add(product.getId()));
            }

            if (idsStock.size() == 0) {
                return new PagingListResponse<>(
                        new ArrayList<>(),
                        new PagingListResponse.Metadata(filter.getPage(), filter.getLimit(), 0));
            }
            if (filter.getIds() != null && !filter.getIds().isEmpty()) {
                filter.setIds(filter.getIds().stream().filter(idsStock::contains).collect(Collectors.toList()));
            } else filter.setIds(idsStock);
        }

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
                    .field("name")
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
        if (filter.getCategory_id() != null) {
            Filter categoryIds = Filter.builder()
                    .field("categoryId")
                    .operator(QueryOperator.EQUALS)
                    .value(filter.getCategory_id().toString())
                    .build();
            filters.add(categoryIds);
        }
        Page<Product> results;
        if (filters.size() > 0)
            results = productRepository.findAll(filterRepository.getSpecificationFromFilters(filters), pageable);
        else results = productRepository.findAll(pageable);
        var data = results.getContent().stream().map(productMapper::entityToResponse).collect(Collectors.toList());

        var serialFilter = new SerialFilterRequest();
        serialFilter.setProduct_ids(data.stream().map(ProductResponse::getId).collect(Collectors.toList()));
        var serials = serialService.filter(serialFilter).getData();
        for (var productResponse : data) {
            productResponse.setQuantityStock(
                    serials.stream().filter(s ->
                            s.getProductId() == productResponse.getId() &&
                                    Objects.equals(s.getStatus(), "active")).count());
            productResponse.setQuantityNotStock(
                    serials.stream().filter(s ->
                            s.getProductId() == productResponse.getId() &&
                                    Objects.equals(s.getStatus(), "inactive")).count());
        }
        return new PagingListResponse<>(
                data,
                new PagingListResponse.Metadata(filter.getPage(), filter.getLimit(), results.getTotalElements()));

    }
}
