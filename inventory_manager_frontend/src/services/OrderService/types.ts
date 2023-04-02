import { BaseFilter, Metadata } from "services/types";

export type OrderResponse = {
  id?: number;
  created_at?: Date;
  modified_at?: Date;
  returned_at?: Date;
  note?: string;
  status: string;
  line_item?: OrderLineItemResponse[];
  account?: AccountResponse;
};

export type ListOrderResponse = {
  orders: OrderResponse[];
  metadata?: Metadata;
}
export type AccountResponse = {
  id?: number;
  name?: string;
  phone?: string;
  email?: string;
};

export type OrderLineItemResponse = {
  id?: number;
  created_at?: Date;
  modified_at?: Date;
  status?: string;
  product_id?: number;
  name?: string;
  description?: string;
  serials?: OrderLineItemSerialResponse[];
};

export type OrderLineItemSerialResponse = {
  id?: number;
  order_lineItem_id?: number;
  product_id?: number;
  serial_id?: number;
  label?: string;
  created_at?: Date;
  modified_at?: Date;
  status?: string;
};
export type OrderFilterRequest = {
  ids?: string;
  query?: string;
  accountIds?: string;
  page: number;
  limit: number;
  statuses?: string;
  createdAtMin?: string;
  createdAtMax?: string;
  modifiedAtMax?: string;
  modifiedAtMin?: string;
  returnedAtMax?: string;
  returnedAtMin?: string;
};
export interface OrdersFilterRequest extends BaseFilter {
  statuses?: string;
  created_at_predefined?: string;
  modified_at_predefined?: string;
  returned_at_predefined?: string;
  returned_at_min?: string;
  returned_at_max?: string;
}
export type OrdersFilterModel = {
  status?: string;
  createdAtMax?: Date | null;
  createdAtMin?: Date | null;
  createdOnPredefined?: string;
  modifiedAtMax?: Date | null;
  modifiedAtMin?: Date | null;
  modifiedAtPredefined?: string;
  returnedAtMax?: Date | null;
  returnedAtMin?: Date | null;
  returnedAtPredefined?: string;
};

export type Account = {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  created_at?: Date;
  modified_at?: Date;
}

export type Accounts = {
  accounts: Account[];
  metadata: Metadata;
}