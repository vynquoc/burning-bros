import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const URL = "https://dummyjson.com";

const axiosClient: AxiosInstance = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    // Do something before request is sent
    // ex: add access token
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
