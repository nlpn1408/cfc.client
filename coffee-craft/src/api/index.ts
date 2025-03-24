import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Create an instance of Axios with default configuration
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    console.log("Token được gửi: ", token);
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axios.isAxiosError(error) && error.response) return error.response;
    return Promise.reject(error);
  }
);
class BaseApi {
  // GET request
  public async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await axiosInstance.get<T>(url, config);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // POST request
  public async post<T, R>(
    url: string,
    data: R,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await axiosInstance.post<T>(url, data, config);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // PUT request
  public async put<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await axiosInstance.put<T>(url, data, config);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // DELETE request
  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await axiosInstance.delete<T>(url, config);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Centralized error handling method
  private handleError(error: any): any {
    if (error.response) {
      // Server responded with a status code other than 2xx
      console.error("API error response", error.response);
      throw new Error(error.response.data?.message || "API Error");
    } else if (error.request) {
      // Request was made but no response was received
      console.error("API error request", error.request);
      throw new Error("No response received from the API");
    } else {
      // Something happened in setting up the request
      console.error("API error message", error.message);
      throw new Error(error.message);
    }
  }
}

// Export an instance of the BaseApi
export const baseApi = new BaseApi();
