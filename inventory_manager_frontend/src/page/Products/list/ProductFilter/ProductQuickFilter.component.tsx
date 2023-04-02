import React from "react";
import {
  ProductQuickFilterOptions,
  ProductStatus,
  getProductQuickFilterLabel,
  getProductStatusName, ProductStock, getProductStockName,
} from "./ProductQuickFilter.consant";
import { isArray } from "lodash";
import QuickFilter from "components/QuickFilter/QuickFilter";
import QuickFilterFixed from "components/QuickFilterFixed/QuickFilterFixed";
import { ProductsFilterRequest } from "services/ProductService";

interface ProductQuickFilterProps {
  filters: ProductsFilterRequest;
  onSubmit: (newFilter: ProductsFilterRequest) => void;
}

const ProductQuickFilter = (props: ProductQuickFilterProps) => {
  const { filters, onSubmit } = props;
  const optionStatusProduct = () => {
    const result = [
      { value: ProductStatus.ACTIVE, label: getProductStatusName(ProductStatus.ACTIVE) },
      { value: ProductStatus.DELETED, label: getProductStatusName(ProductStatus.DELETED) },
    ];
    return result;
  };

  const optionStockProduct = () => {
    const result = [
      { value: ProductStock.TRUE, label: getProductStockName(ProductStock.TRUE) },
      { value: ProductStock.FALSE, label: getProductStockName(ProductStock.FALSE) },
    ];
    return result;
  };

  return (
    <QuickFilter>
      <QuickFilterFixed
        widthPopper={200}
        options={optionStatusProduct()}
        label={getProductQuickFilterLabel(ProductQuickFilterOptions.STATUS)}
        getOptionLabel={(item) => item.label as string}
        value={filters?.status?.split(",").map((sl) => {
          return { value: sl, label: getProductStatusName(sl) };
        })}
        uniqKey="value"
        handleSubmit={(value) => {
          if (value && isArray(value)) {
            let statuses = value.map((item: any) => item.value).join(",");
            let newFilters: ProductsFilterRequest = { ...filters, statuses: statuses };
            onSubmit(newFilters);
          }
        }}
      />
      <QuickFilterFixed
        widthPopper={200}
        options={optionStockProduct()}
        label={getProductQuickFilterLabel(ProductQuickFilterOptions.STOCK)}
        getOptionLabel={(item) => item.label as string}
        value={filters?.stock?.split(",").map((sl) => {
          return { value: sl, label: getProductStockName(sl) };
        })}
        uniqKey="value"
        handleSubmit={(value) => {
          if (value && isArray(value)) {
            let statuses = value.map((item: any) => item.value).join(",");
            let newFilters: ProductsFilterRequest = { ...filters, stock: statuses };
            onSubmit(newFilters);
          }
        }}
      />
    </QuickFilter>
  );
};

export default ProductQuickFilter;
