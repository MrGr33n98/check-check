import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

interface AuthTokens {
  'access-token': string;
  client: string;
  uid: string;
  expiry: string;
  'token-type': string;
}

class AuthMiddleware {
  private static instance: AuthMiddleware;
  private axiosInstance: AxiosInstance;
  private tokens: AuthTokens | null = null;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    this.setupInterceptors();
  }

  public static getInstance(): AuthMiddleware {
    if (!AuthMiddleware.instance) {
      AuthMiddleware.instance = new AuthMiddleware();
    }
    return AuthMiddleware.instance;
  }

  private setupInterceptors(): void {
    this.axiosInstance.interceptors.request.use(
      (config: ExtendedAxiosRequestConfig) => {
        if (this.tokens) {
          config.headers = {
            ...config.headers,
            'access-token': this.tokens['access-token'],
            'client': this.tokens.client,
            'uid': this.tokens.uid,
            'token-type': this.tokens['token-type'],
            'expiry': this.tokens.expiry
          };
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        const newTokens = this.extractTokensFromResponse(response);
        if (newTokens) {
          this.tokens = newTokens;
          this.setTokens(newTokens);
        }
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as ExtendedAxiosRequestConfig;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const tokens = this.getTokens();
            if (tokens) {
              const response = await this.axiosInstance.get('/auth/validate_token', {
                headers: {
                  'access-token': tokens['access-token'],
                  'client': tokens.client,
                  'uid': tokens.uid,
                  'token-type': tokens['token-type']
                }
              });
              const newTokens = this.extractTokensFromResponse(response);
              if (newTokens) {
                this.setTokens(newTokens);
                originalRequest.headers = {
                  ...originalRequest.headers,
                  'access-token': newTokens['access-token'],
                  'client': newTokens.client,
                  'uid': newTokens.uid,
                  'token-type': newTokens['token-type'],
                  'expiry': newTokens.expiry
                };
                return this.axiosInstance(originalRequest);
              }
            }
          } catch (refreshError) {
            this.clearTokens();
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }
        if (error.response?.status === 401) {
          this.clearTokens();
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  private extractTokensFromResponse(response: AxiosResponse): AuthTokens | null {
    const headers = response.headers;
    const newToken = headers['access-token'];
    const client = headers['client'];
    const uid = headers['uid'];
    const expiry = headers['expiry'];
    const tokenType = headers['token-type'];

    if (newToken && client && uid && tokenType) {
      return {
        'access-token': newToken,
        client,
        uid,
        expiry: expiry || '',
        'token-type': tokenType
      };
    }

    return null;
  }

  public setTokens(tokens: AuthTokens): void {
    this.tokens = tokens;
    localStorage.setItem('auth_tokens', JSON.stringify(tokens));
  }

  public getTokens(): AuthTokens | null {
    if (!this.tokens) {
      const storedTokens = localStorage.getItem('auth_tokens');
      if (storedTokens) {
        this.tokens = JSON.parse(storedTokens);
      }
    }
    return this.tokens;
  }

  public clearTokens(): void {
    this.tokens = null;
    localStorage.removeItem('auth_tokens');
  }

  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}

export const authMiddleware = AuthMiddleware.getInstance();
export const api = authMiddleware.getAxiosInstance();