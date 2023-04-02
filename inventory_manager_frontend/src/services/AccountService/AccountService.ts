import axios, { AxiosResponse } from "axios";
import { getAxiosConfig } from "../config";
import { AccountResponse } from "./types";

class AccountService {
  static async getProfiles(): Promise<AxiosResponse<{ account_response: AccountResponse }>> {
    return axios.get(`/accounts/profiles`, { ...getAxiosConfig() });
  }
}
export default AccountService;
