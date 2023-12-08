import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

// Create an Axios instance with a base URL
const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3080/',
  timeout: 5000,
});

// Add request interceptors
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // if auth token exists, add it to the header; otherwise, do nothing
    const authTokenString = localStorage.getItem('authToken');

    if (authTokenString) {
      const authToken = JSON.parse(authTokenString);
      const headers = config.headers || {};
      headers.Authorization = `Bearer ${authToken.token}`;
      config.headers = headers;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Add response interceptors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  error => {
    console.error('Response interceptor called', error);
    return Promise.reject(error);
  },
);

export default api;
