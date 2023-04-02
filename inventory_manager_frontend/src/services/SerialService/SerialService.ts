import axios, { AxiosResponse } from "axios";
import { getAxiosConfig } from "../config";
import {SerialResponse, ListSerialResponse, SerialFilterRequest, SerialResponseWithOrder} from "./types";
import {CategoryResponse} from "../CategoryService";

class SerialService {
  static async filter(filter: SerialFilterRequest): Promise<AxiosResponse<ListSerialResponse>> {
    return axios.get(`/serials`, { ...getAxiosConfig(), params: filter });
  }

  static async getById(id: number): Promise<AxiosResponse<SerialResponse>> {
    return axios.get(`/serials/${id}`, { ...getAxiosConfig() });
  }

  static async getWithOrder(id: number): Promise<AxiosResponse<SerialResponseWithOrder>> {
    return axios.get(`/serials/with_order/${id}`, { ...getAxiosConfig() });
  }

}
export default SerialService;
