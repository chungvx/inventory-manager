import axios, { AxiosResponse } from "axios";
import { CreateOrderRequest } from "page/Orders/create/CreateOrders.types";
import { BaseFilter } from "services/types";
import { getAxiosConfig } from "../config";
import { OrderResponse, ListOrderResponse, OrderFilterRequest, Accounts } from "./types";

class OrderService {
  static async filter(filter: OrderFilterRequest): Promise<AxiosResponse<ListOrderResponse>> {
    return axios.get(`/orders`, { ...getAxiosConfig(), params: filter });
  }
  static async filterUser(filter: BaseFilter): Promise<AxiosResponse<Accounts>> {
    return axios.get(`/orders/accounts`, { ...getAxiosConfig(), params: filter });
  }
  static async getById(id?: string): Promise<AxiosResponse<OrderResponse>> {
    return axios.get(`/orders/${id}`, { ...getAxiosConfig() });
  }
  static async create(order?: CreateOrderRequest): Promise<AxiosResponse<OrderResponse>> {
    return axios.post(`/orders`, { ...order }, { ...getAxiosConfig() });
  }
  static async delete(id?: string): Promise<AxiosResponse<null>> {
    return axios.delete(`/orders/${id}/delete`, { ...getAxiosConfig() });
  }
  static async return(id?: string): Promise<AxiosResponse<OrderResponse>> {
    return axios.put(`/orders/${id}/return`,{}, { ...getAxiosConfig() });
  }
}
export default OrderService;
