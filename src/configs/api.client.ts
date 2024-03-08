import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string, timeout: number) {
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
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config);
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, config);
  }

  public async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.patch(url, data, config);
  }
}

export const mainApiClient = new ApiClient(
  import.meta.env.VITE_APP_API_ORIGIN_URL || "",
  Number(import.meta.env.VITE_APP_FETCH_TIMEOUT) || 3000
);
