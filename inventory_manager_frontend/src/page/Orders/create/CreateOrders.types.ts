export type CreateOrderRequest = {
  id?: number;
  account_id?: number;
  note?: string;
  status?: string;
  line_items?: OrderLineItemRequest[];
};

export type OrderLineItemRequest = {
  serials?: SerialRequest[];
  id?: number;
  product_id: number;
  name?: string;
  description?: string;
};

export type SerialRequest = {
  id?: number;
  serial_id?: number;
  label?: string;
};
