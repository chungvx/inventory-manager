import axios, { AxiosResponse } from "axios";
import { getAxiosConfig } from "../config";
import {ProductResponse, ListProductResponse, ProductFilterRequest, ProductRequest} from "./types";

class ProductService {
  static async filter(filter: ProductFilterRequest): Promise<AxiosResponse<ListProductResponse>> {
    return axios.get(`/products`, { ...getAxiosConfig(), params: filter });
  }

  static async create(
    product: ProductRequest
  ): Promise<AxiosResponse<ProductResponse>> {
    return axios.post(`/products`, {...product}, { ...getAxiosConfig() });
  }

  static async update(
    id: number,
    product: ProductRequest
  ): Promise<AxiosResponse<ProductResponse>> {
    return axios.put(`/products/${id}`, {...product}, { ...getAxiosConfig() });
  }

  static async getById(id: number): Promise<AxiosResponse<ProductResponse>> {
    return axios.get(`/products/${id}`, { ...getAxiosConfig() });
  }

  static async delete(id: number): Promise<AxiosResponse<ProductResponse>> {
    return axios.delete(`/products/${id}`, { ...getAxiosConfig() });
  }
}
export default ProductService;
