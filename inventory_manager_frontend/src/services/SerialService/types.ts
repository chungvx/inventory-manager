import { Metadata } from "services/types";

export type SerialFilterRequest = {
  ids?: string;
  query?: string;
  product_ids?: number[];
  page: number;
  limit: number;
  statuses?: string;
};

export interface SerialResponse {
  id?: number;
  product_id?: number;
  label: string;
  status?: string;
  created_at?: Date;
  modified_at?: Date;
};

export interface SerialResponseWithOrder extends SerialResponse {
  order_id?: number;
  order_line_item_id?: number;
}

export type ListSerialResponse = {
  data: SerialResponse[];
  metadata?: Metadata;
};
