import React from 'react';
import { ImageDisplay } from './ImageDisplay';
import { GeneratedImage } from '../types';
import { Images, Sparkles } from 'lucide-react';

interface GalleryProps {
  images: GeneratedImage[];
}

export const Gallery: React.FC<GalleryProps> = ({ images }) => {
  if (images.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
          <Images className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">No images yet</h3>
        <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
          Start by entering a creative prompt above to generate your first AI masterpiece! 
          Try something like "a magical forest with glowing trees" or "a futuristic city at sunset".
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
          <Sparkles size={16} />
          <span>Unlimited free generations</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Your Creations</h2>
          <p className="text-sm text-gray-600 mt-1">
            {images.length} image{images.length !== 1 ? 's' : ''} generated
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
          <Sparkles size={14} />
          <span className="font-medium">All Generated</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((image, index) => (
          <ImageDisplay 
            key={image.id} 
            image={image} 
            isLatest={index === 0}
          />
        ))}
      </div>
    </div>
  );
};