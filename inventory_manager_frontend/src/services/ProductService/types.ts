import { BaseFilter, Metadata } from "services/types";

export type ProductResponse = {
  id: number;
  created_at?: Date;
  modified_at?: Date;
  category_id?: number;
  name: string;
  description?: string;
  quantity_stock: number;
  quantity_not_stock: number;
  status: string;
};

export type ListProductResponse = {
  data: ProductResponse[];
  metadata?: Metadata;
}

export type ProductFilterRequest = {
  ids?: string;
  query?: string;
  category_id?: number;
  page: number;
  limit: number;
  statuses?: string;
  stock?: string;

};
export interface ProductsFilterRequest extends BaseFilter {
  statuses?: string;
  category_id?: number;
  stock?: string;
}

export interface ProductRequest {
  id?: number;
  name?: string;
  description?: string;
  category_id?: number;
  serials?: string[];
}
