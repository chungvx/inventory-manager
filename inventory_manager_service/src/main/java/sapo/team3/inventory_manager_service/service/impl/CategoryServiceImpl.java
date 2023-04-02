package sapo.team3.inventory_manager_service.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import sapo.team3.inventory_manager_service.configuration.utils.Status;
import sapo.team3.inventory_manager_service.model.entity.Category;
import sapo.team3.inventory_manager_service.model.mapper.CategoryMapper;
import sapo.team3.inventory_manager_service.model.response.PagingListResponse;
import sapo.team3.inventory_manager_service.model.response.category.CategoryFilterRequest;
import sapo.team3.inventory_manager_service.model.response.category.CategoryRequest;
import sapo.team3.inventory_manager_service.model.response.category.CategoryResponse;
import sapo.team3.inventory_manager_service.repository.CategoryRepository;
import sapo.team3.inventory_manager_service.repository.Filter;
import sapo.team3.inventory_manager_service.repository.FilterRepository;
import sapo.team3.inventory_manager_service.repository.QueryOperator;
import sapo.team3.inventory_manager_service.service.CategoryService;

import java.util.ArrayList;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    private final FilterRepository<Category> filterRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository,
                               CategoryMapper categoryMapper,
                               FilterRepository<Category> filterRepository) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
        this.filterRepository = filterRepository;
    }

    @Override
    public CategoryResponse getById(long id) {
        var category = categoryRepository.getOne(id);
        return categoryMapper.entityToResponse(category);
    }

    @Override
    public CategoryResponse create(CategoryRequest input) {
        var category = new Category();
        category.setName(input.getName());
        category.setStatus(Status.ACTIVE);

        var newCategory = categoryRepository.save(category);
        return categoryMapper.entityToResponse(newCategory);
    }

    @Override
    public CategoryResponse update(long id, CategoryRequest input) {
        var category = categoryRepository.getOne(id);
        category.setName(input.getName());
        var newCategory = categoryRepository.save(category);
        return categoryMapper.entityToResponse(newCategory);
    }

    @Override
    public CategoryResponse delete(long id) {
        var category = categoryRepository.getOne(id);
        if (category.getStatus().equals(Status.DELETED)){
            throw new RuntimeException("Sp đã xóa rồi");
        }
        category.setStatus(Status.DELETED);
        var newCategory = categoryRepository.save(category);
        return categoryMapper.entityToResponse(newCategory);
    }

    @Override
    public PagingListResponse<CategoryResponse> filter(CategoryFilterRequest filter) {
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
        Page<Category> results;
        if (filters.size() > 0)
            results = categoryRepository.findAll(filterRepository.getSpecificationFromFilters(filters), pageable);
        else results = categoryRepository.findAll(pageable);
        var data = results.getContent().stream().map(categoryMapper::entityToResponse).collect(Collectors.toList());
        return new PagingListResponse<>(
                data,
                new PagingListResponse.Metadata(filter.getPage(), filter.getLimit(), results.getTotalElements()));
    }
}
