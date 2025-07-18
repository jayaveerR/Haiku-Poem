import React from 'react';
import { AlertCircle, RefreshCw, Lightbulb } from 'lucide-react';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg border border-red-200 p-6">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">Generation Failed</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {error || 'Something went wrong while generating your image. Please try again.'}
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-blue-800">
              <p className="font-medium mb-1">Tips for better results:</p>
              <ul className="text-left space-y-1">
                <li>• Be more specific in your description</li>
                <li>• Try a different art style</li>
                <li>• Avoid complex or conflicting elements</li>
              </ul>
            </div>
          </div>
        </div>

        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:from-red-700 hover:to-pink-700 transition-all duration-200 mx-auto shadow-sm hover:shadow-md font-medium"
        >
          <RefreshCw size={16} />
          Try Again
        </button>
      </div>
    </div>
  );
};