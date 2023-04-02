import axios, { AxiosResponse } from "axios";
import { getAxiosConfig } from "../config";
import {ListCategoryResponse, CategoryFilterRequest, CategoryResponse} from "./types";

class CategoryService {
  static async filter(filter: CategoryFilterRequest): Promise<AxiosResponse<ListCategoryResponse>> {
    return axios.get(`/categories`, { ...getAxiosConfig(), params: filter });
  }

  static async getById(id: number): Promise<AxiosResponse<CategoryResponse>> {
    return axios.get(`/categories/${id}`, { ...getAxiosConfig() });
  }
}
export default CategoryService;
