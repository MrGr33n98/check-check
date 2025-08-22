// Error handling utility for the admin module

export class AdminError extends Error {
  constructor(
    message: string,
    public code?: string,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = 'AdminError';
  }
}

export const handleApiError = (error: any): AdminError => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        return new AdminError(
          data.message || 'Requisição inválida',
          'BAD_REQUEST',
          data.details
        );
      case 401:
        return new AdminError(
          'Não autorizado. Faça login novamente.',
          'UNAUTHORIZED'
        );
      case 403:
        return new AdminError(
          'Acesso negado. Você não tem permissão para realizar esta ação.',
          'FORBIDDEN'
        );
      case 404:
        return new AdminError(
          'Recurso não encontrado.',
          'NOT_FOUND'
        );
      case 500:
        return new AdminError(
          'Erro interno do servidor. Tente novamente mais tarde.',
          'INTERNAL_ERROR'
        );
      default:
        return new AdminError(
          data.message || `Erro desconhecido (${status})`,
          'UNKNOWN_ERROR'
        );
    }
  } else if (error.request) {
    // Request was made but no response received
    return new AdminError(
      'Erro de conexão. Verifique sua internet e tente novamente.',
      'CONNECTION_ERROR'
    );
  } else {
    // Something else happened
    return new AdminError(
      error.message || 'Erro desconhecido',
      'UNKNOWN_ERROR'
    );
  }
};

export const showErrorNotification = (error: AdminError): void => {
  // In a real app, this would show a notification to the user
  console.error('Admin Error:', error);
  
  // Example using a toast library:
  // toast.error(error.message, {
  //   position: 'top-right',
  //   autoClose: 5000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  // });
};