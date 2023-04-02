import { Account } from "services/OrderService";
import create, { SetState } from "zustand";
import { CreateOrderRequest, OrderLineItemRequest } from "./CreateOrders.types";

const initOrderStore = {
  order: {},
  lineItems: [],
  account: {},
};

export const useCreateOrderStore = create<OrderStore>((set) => ({
  ...initOrderStore,
  set: set,
  deleteEverything: () =>
    set((prev) => ({
      ...prev,
      ...initOrderStore,
    })),
  addOrderLineItems: (item: OrderLineItemRequest) =>
    set((prev) => ({
      lineItems: prev.lineItems.find((x) => x.product_id === item.product_id)
        ? [...(prev.lineItems || [])]
        : [...(prev.lineItems || []), item],
    })),
  updateOrderLineItems: (lineItem: OrderLineItemRequest) =>
    set((prev) => ({
      lineItems: prev.lineItems.map((item) => (item.product_id === lineItem.product_id ? lineItem : item)),
    })),
  deleteOrderLineItemById: (idProduct: number) =>
    set((prev) => {
      if (prev.lineItems.length > 1) {
        let newLineItems = prev.lineItems.filter((item) => item.product_id !== idProduct);
        return {
          ...prev,
          lineItems: newLineItems,
        };
      } else {
        return {
          ...prev,
          lineItems: [],
        };
      }
    }),
}));

export type OrderStore = {
  order: CreateOrderRequest;
  lineItems: OrderLineItemRequest[];
  account: Account;
  deleteEverything: () => void;
  addOrderLineItems: (item: OrderLineItemRequest) => void;
  deleteOrderLineItemById: (idProduct: number) => void;
  updateOrderLineItems: (lineItem: OrderLineItemRequest) => void;
  set: SetState<OrderStore>;
};
