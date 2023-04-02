import { BaseFilter, Metadata } from "services/types";

export type CategoryResponse = {
  id: number;
  created_at?: Date;
  modified_at?: Date;
  name: string;
  status: string;
};

export type ListCategoryResponse = {
  data: CategoryResponse[];
  metadata?: Metadata;
}

export type CategoryFilterRequest = {
  ids?: string;
  query?: string;
  page: number;
  limit: number;
  statuses?: string;

};
