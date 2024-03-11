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
    params?: QueryParams,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(
      this.assembleEndpoint(url, params),
      config
    );
  }

  public async get<T>(
    url: string,
    params?: QueryParams,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(
      this.assembleEndpoint(url, params),
      config
    );
  }

  public async post<T>(
    url: string,
    data?: any,
    params?: QueryParams,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    const requestConfig: AxiosRequestConfig = { params, ...config };
    return this.axiosInstance.post<T>(
      this.assembleEndpoint(url),
      data,
      requestConfig
    );
  }

  public async put<T>(
    url: string,
    data?: any,
    params?: QueryParams,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    const requestConfig: AxiosRequestConfig = { params, ...config };
    return this.axiosInstance.put<T>(
      this.assembleEndpoint(url),
      data,
      requestConfig
    );
  }

  public async patch<T>(
    url: string,
    data?: any,
    params?: QueryParams,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    const requestConfig: AxiosRequestConfig = { params, ...config };
    return this.axiosInstance.patch(
      this.assembleEndpoint(url),
      data,
      requestConfig
    );
  }

  private assembleEndpoint(url: string, params?: any): string {
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
