import React from 'react';
import { Download, Share2, Heart, Clock, Palette } from 'lucide-react';
import { GeneratedImage } from '../types';
import { AIService } from '../services/aiService';
import { HaikuDisplay } from './HaikuDisplay';

interface ImageDisplayProps {
  image: GeneratedImage;
  isLatest?: boolean;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ image, isLatest = false }) => {
  const handleDownload = async () => {
    try {
      const filename = `ai-generated-${Date.now()}.png`;
      await AIService.downloadImage(image.imageUrl, filename);
    } catch (error) {
      console.error('Failed to download image:', error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AI Generated Image',
          text: `Check out this AI-generated image: "${image.prompt}"`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`Check out this AI-generated image: "${image.prompt}" - ${window.location.href}`);
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStyleBadge = (style?: string) => {
    if (!style) return null;
    
    const styleColors = {
      realistic: 'bg-green-100 text-green-800',
      fantasy: 'bg-purple-100 text-purple-800',
      cartoon: 'bg-yellow-100 text-yellow-800',
      anime: 'bg-pink-100 text-pink-800',
      sketch: 'bg-gray-100 text-gray-800',
      'oil-painting': 'bg-orange-100 text-orange-800',
      cyberpunk: 'bg-blue-100 text-blue-800',
      vintage: 'bg-amber-100 text-amber-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styleColors[style as keyof typeof styleColors] || 'bg-gray-100 text-gray-800'}`}>
        {style.charAt(0).toUpperCase() + style.slice(1).replace('-', ' ')}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      <div className={`group relative bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isLatest ? 'ring-2 ring-blue-500' : ''}`}>
        <div className="relative overflow-hidden">
          <img
            src={image.imageUrl}
            alt={image.prompt}
            className="w-full h-64 sm:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Overlay with actions */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex gap-3">
              <button
                onClick={handleDownload}
                className="p-3 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg"
                title="Download"
              >
                <Download size={20} />
              </button>
              <button
                onClick={handleShare}
                className="p-3 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg"
                title="Share"
              >
                <Share2 size={20} />
              </button>
              <button
                className="p-3 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg"
                title="Like"
              >
                <Heart size={20} />
              </button>
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {isLatest && (
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                ✨ Latest
              </div>
            )}
            {getStyleBadge(image.style)}
          </div>
        </div>

        <div className="p-4">
          <p className="text-sm text-gray-700 mb-3 line-clamp-3 leading-relaxed">
            "{image.prompt}"
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>{formatTime(image.timestamp)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Palette size={12} />
              <span className="text-green-600 font-medium">Generated</span>
            </div>
          </div>
        </div>
      </div>

      {/* Associated Haiku */}
      {image.haiku && (
        <HaikuDisplay haiku={image.haiku} compact />
      )}
    </div>
  );
};