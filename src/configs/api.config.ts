import { QueryParams } from "@/types/react-query.type";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export class ApiClient {
  private axiosInstance: AxiosInstance;
  private baseUrl: string;

  constructor(baseUrl: string, timeout: number) {
    this.baseUrl = baseUrl;
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      timeout: timeout,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    // Response Interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              break;
            case 404:
              break;
            // Add more cases for other error statuses if needed
          }
        }

        return Promise.reject(error);
      }
    );
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, config);
  }

  public async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, config);
  }

  public async post<T>(
    url: string,
    config?: AxiosRequestConfig,
    payload?: any
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, payload, config);
  }

  public async put<T>(
    url: string,
    config?: AxiosRequestConfig,
    payload?: any
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, payload, config);
  }

  public async patch<T>(
    url: string,
    config?: AxiosRequestConfig,
    payload?: any
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.patch(url, payload, config);
  }

  public assembleEndpoint(url: string, params?: any): string {
    let assembledUrl = this.baseUrl + url;

    if (params) {
      const queryString = this.getQueryString(params);
      assembledUrl += `?${queryString}`;
    }

    return assembledUrl;
  }

  private getQueryString(params: any): string {
    return Object.keys(params)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      )
      .join("&");
  }
}

export const mainApiClient = new ApiClient(
  import.meta.env.VITE_APP_API_ORIGIN_URL || "",
  Number(import.meta.env.VITE_APP_FETCH_TIMEOUT) || 3000
);
