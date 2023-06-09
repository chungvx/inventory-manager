export type Metadata = {
  total: number;
  page: number;
  limit: number;
};

export interface BaseFilter extends GridState {
  query?: string;
  created_at_min?: string;
  created_at_max?: string;
  status?: string;
  ids?: string;
  location_ids?: string;
  export_type?: string;
  account_ids?: string;
  modified_at_min?: string;
  modified_at_max?: string;
}
export interface GridState {
  limit?: number;
  page?: number;
  sort_by?: string;
  sort_direction?: string;
  time?: number | null;
}
export interface IOMessage {
  message?: string;
  email?: string;
}
export type FileImportRequest = {
  bytes?: number[] | null;
  file_name?: string;
  file_size?: number;
  file_url?: string;
  base64?: string;
  tenant_id?: number;
  location_id?: number;
  destination_location_id?: number;
  delivery_service_provider_id?: number;
};

export type Pageable = {
  size: number;
  page: number;
};
export interface ReportInventoryDetailStockDiffLogFilter extends BaseFilter {
  inventory_field?: string;
  compare_type?: string;
  location_ids?: string;
  variant_id?: number;
}

export * from "./AccountService/types";
