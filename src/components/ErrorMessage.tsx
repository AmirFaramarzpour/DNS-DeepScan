import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  details?: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, details, onRetry }) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-red-900 bg-opacity-30 backdrop-blur-md border border-red-800 rounded-xl animate-fade-in">
      <div className="flex items-start space-x-3">
        <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-red-300 mb-1">Analysis Failed</h3>
          <p className="text-red-400 mb-2">{message}</p>
          {details && (
            <p className="text-red-300 text-sm bg-red-800 bg-opacity-30 p-2 rounded border border-red-700">{details}</p>
          )}
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-4 inline-flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;