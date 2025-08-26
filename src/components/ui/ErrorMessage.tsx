import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

const ErrorMessage = ({ 
  title = "Ops! Algo deu errado", 
  message = "Não foi possível carregar o conteúdo. Tente novamente.", 
  onRetry,
  showRetry = true 
}: ErrorMessageProps) => {
  return (
    <div className="text-center py-16">
      <div className="text-red-400 mb-4">
        <AlertCircle className="w-16 h-16 mx-auto" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        {message}
      </p>
      {showRetry && onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <RefreshCw className="w-4 h-4" />
          Tentar novamente
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;