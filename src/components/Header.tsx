import React from 'react';
import { Palette, Github, Star, Zap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Haiku
              </h1>
              <p className="text-xs text-gray-600">Powered by ClipDrop</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600 bg-gradient-to-r from-green-50 to-blue-50 px-3 py-1 rounded-full border border-green-200">
              <Zap className="w-4 h-4 text-green-600" />
              <span className="font-medium text-green-800">ClipDrop API</span>
            </div>
            <div className="hidden md:flex items-center gap-1 text-sm text-gray-600">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>Stable Diffusion XL</span>
            </div>
            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200">
              <Github size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};