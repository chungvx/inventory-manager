package sapo.team3.inventory_manager_service.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sapo.team3.inventory_manager_service.model.entity.Product;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    @Query(value = "select * from Products where EXISTS (select * from Serials where Serials.ProductId = Products.Id and Status = 'active')", nativeQuery = true)
    List<Product> findByStock();

    @Query(value = "select * from Products where NOT EXISTS (select * from Serials where Serials.ProductId = Products.Id and Status = 'active')", nativeQuery = true)
    List<Product> findByNotStock();
}
