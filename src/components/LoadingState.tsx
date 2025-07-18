import React from 'react';
import { Palette, Sparkles, Wand2 } from 'lucide-react';

interface LoadingStateProps {
  prompt: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ prompt }) => {
  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
            <Palette className="w-10 h-10 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center animate-spin">
            <Wand2 className="w-4 h-4 text-white" />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-800">Creating Your Masterpiece</h3>
          <p className="text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
            "{prompt}"
          </p>
        </div>

        <div className="space-y-3">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-3 rounded-full animate-pulse transition-all duration-1000" style={{ width: '70%' }}></div>
          </div>
          <p className="text-xs text-gray-500">
            AI is painting your vision... This usually takes 10-20 seconds
          </p>
        </div>

        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
        </div>
      </div>
    </div>
  );
};