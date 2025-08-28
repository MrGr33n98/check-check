import { authMiddleware, api } from '../middleware/authMiddleware';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  corporate_email?: string;
  company_name?: string;
  position?: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  corporate_email?: string;
  company_name?: string;
  position?: string;
}

export class AuthService {
  private static instance: AuthService;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async login(credentials: LoginCredentials): Promise<User> {
    try {
      const response = await api.post('/auth/sign_in', credentials);
      const { data } = response;
      this.handleAuthResponse(response);
      return data.data;
    } catch (error) {
      throw this.handleError(error, 'Falha na autenticação');
    }
  }

  public async register(userData: RegisterData): Promise<User> {
    try {
      const response = await api.post('/auth', {
        ...userData,
        password_confirmation: userData.password
      });
      const { data } = response;
      this.handleAuthResponse(response);
      return data.data;
    } catch (error) {
      throw this.handleError(error, 'Falha no registro');
    }
  }

  public async logout(): Promise<void> {
    try {
      await api.delete('/auth/sign_out');
      this.clearAuth();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      this.clearAuth();
    }
  }

  public async validateToken(): Promise<User | null> {
    try {
      const tokens = authMiddleware.getTokens();
      if (!tokens) return null;

      const response = await api.get('/auth/validate_token');
      return response.data.data;
    } catch (error) {
      this.clearAuth();
      return null;
    }
  }

  private handleAuthResponse(response: any): void {
    const headers = response.headers;
    authMiddleware.setTokens({
      'access-token': headers['access-token'],
      'client': headers['client'],
      'uid': headers['uid'],
      'expiry': headers['expiry'],
      'token-type': headers['token-type']
    });
  }

  private handleError(error: any, defaultMessage: string): Error {
    if (error.response?.data?.errors) {
      const errorMessages = error.response.data.errors.join(', ');
      return new Error(errorMessages);
    }
    return new Error(defaultMessage);
  }

  private clearAuth(): void {
    authMiddleware.clearTokens();
  }

  public isAuthenticated(): boolean {
    return !!authMiddleware.getTokens();
  }
}

export const authService = AuthService.getInstance();