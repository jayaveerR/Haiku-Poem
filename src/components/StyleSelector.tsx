import React from 'react';
import { ImageStyle } from '../types';
import { 
  Camera, 
  Wand2, 
  Palette, 
  Sparkles, 
  PenTool, 
  Brush, 
  Zap, 
  Clock 
} from 'lucide-react';

interface StyleSelectorProps {
  selectedStyle: string;
  onStyleChange: (style: string) => void;
}

const IMAGE_STYLES: ImageStyle[] = [
  {
    id: 'realistic',
    name: 'Realistic',
    description: 'Photorealistic images',
    prompt_suffix: 'photorealistic, highly detailed, 8k',
    negative_prompt: 'cartoon, anime, painting, drawing',
    icon: 'Camera',
    clipdrop_style: 'photographic'
  },
  {
    id: 'fantasy',
    name: 'Fantasy',
    description: 'Magical and mystical',
    prompt_suffix: 'fantasy art, magical, ethereal, mystical',
    icon: 'Wand2',
    clipdrop_style: 'fantasy-art'
  },
  {
    id: 'cartoon',
    name: 'Cartoon',
    description: 'Animated style',
    prompt_suffix: 'cartoon style, animated, colorful, stylized',
    negative_prompt: 'photorealistic, realistic',
    icon: 'Palette',
    clipdrop_style: 'comic-book'
  },
  {
    id: 'anime',
    name: 'Anime',
    description: 'Japanese animation style',
    prompt_suffix: 'anime style, manga, japanese animation',
    icon: 'Sparkles',
    clipdrop_style: 'anime'
  },
  {
    id: 'sketch',
    name: 'Sketch',
    description: 'Pencil drawings',
    prompt_suffix: 'pencil sketch, line art, black and white drawing',
    negative_prompt: 'colored, photorealistic',
    icon: 'PenTool',
    clipdrop_style: 'line-art'
  },
  {
    id: 'oil-painting',
    name: 'Oil Painting',
    description: 'Classical art style',
    prompt_suffix: 'oil painting, classical art, painted, artistic',
    icon: 'Brush',
    clipdrop_style: 'digital-art'
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Futuristic neon style',
    prompt_suffix: 'cyberpunk, neon lights, futuristic, sci-fi',
    icon: 'Zap',
    clipdrop_style: '3d-model'
  },
  {
    id: 'vintage',
    name: 'Vintage',
    description: 'Retro and classic',
    prompt_suffix: 'vintage, retro, old-fashioned, classic',
    icon: 'Clock',
    clipdrop_style: 'photographic'
  }
];

const getIcon = (iconName: string) => {
  const icons = {
    Camera,
    Wand2,
    Palette,
    Sparkles,
    PenTool,
    Brush,
    Zap,
    Clock
  };
  const IconComponent = icons[iconName as keyof typeof icons];
  return IconComponent ? <IconComponent size={20} /> : <Palette size={20} />;
};

export const StyleSelector: React.FC<StyleSelectorProps> = ({ 
  selectedStyle, 
  onStyleChange 
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Choose Style</h3>
        <p className="text-sm text-gray-600">Select an art style powered by ClipDrop's Stable Diffusion XL</p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {IMAGE_STYLES.map((style) => (
          <button
            key={style.id}
            onClick={() => onStyleChange(style.id)}
            className={`p-3 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
              selectedStyle === style.id
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
            }`}
            title={style.description}
          >
            <div className="flex flex-col items-center gap-2">
              <div className={`p-2 rounded-lg ${
                selectedStyle === style.id ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                {getIcon(style.icon)}
              </div>
              <span className="text-xs font-medium text-center leading-tight">
                {style.name}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};