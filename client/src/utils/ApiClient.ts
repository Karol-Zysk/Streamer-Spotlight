import axios, { AxiosRequestConfig } from "axios";

export const baseUrl = "http://127.0.0.1:4000/api/v1";

export class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = baseUrl;
  }

  private async request<T>(config: AxiosRequestConfig): Promise<any> {
    try {
      const headers = config.headers || {};

      const response = await axios.request<T>({
        ...config,
        headers,
        baseURL: this.baseUrl,
      });

      if (!response.data) {
        throw new Error("No data returned from server");
      }

      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  async get<T>(url: string, params?: any): Promise<T> {
    return this.request<T>({
      method: "get",
      url,
      params,
      baseURL: this.baseUrl,
    });
  }

  async post<T>(url: string, data?: any): Promise<T> {
    return this.request<T>({
      method: "post",
      url,
      data,
      baseURL: this.baseUrl,
    });
  }

  async put<T>(url: string, data?: any): Promise<T> {
    return this.request<T>({
      method: "put",
      url,
      data,
      baseURL: this.baseUrl,
    });
  }
}
