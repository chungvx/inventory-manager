import { AxiosRequestConfig } from "axios";
import qs from "qs";
import { getCookie } from "utilities";

export const REACT_APP_API_BASE_URL = `http://localhost:8080/admin`;
export const getAxiosConfig = (): AxiosRequestConfig => {
  return {
    baseURL: REACT_APP_API_BASE_URL,
    timeout: 100000,
    responseType: "json",
    maxContentLength: 10000,
    validateStatus: (status: number) => status >= 200 && status < 300,
    maxRedirects: 5,
    paramsSerializer(params) {
      return qs.stringify(params, { arrayFormat: "comma" });
    },
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY3MTcyMTcwNSwiZXhwIjoxNjcxODA4MTA1fQ.EgCJ8EfNxmCmSn0gQFYRiVEU3zI9jxZSsyIHyQDtTS24Ip5uOAMRFiiC6d_RN_dJz5qJj02tpP5mQ0FLynfjWQ",
    },
  };
};
