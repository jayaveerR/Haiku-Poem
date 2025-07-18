import React from 'react';
import { Feather, Clock, Heart } from 'lucide-react';
import { Haiku } from '../types';

interface HaikuDisplayProps {
  haiku: Haiku;
  compact?: boolean;
}

export const HaikuDisplay: React.FC<HaikuDisplayProps> = ({ haiku, compact = false }) => {
  const getEmotionColor = (emotion: string) => {
    const colors = {
      serene: 'bg-blue-100 text-blue-800 border-blue-200',
      melancholic: 'bg-gray-100 text-gray-800 border-gray-200',
      joyful: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      contemplative: 'bg-purple-100 text-purple-800 border-purple-200',
      nostalgic: 'bg-amber-100 text-amber-800 border-amber-200',
      peaceful: 'bg-green-100 text-green-800 border-green-200',
      mysterious: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      hopeful: 'bg-pink-100 text-pink-800 border-pink-200',
      wistful: 'bg-rose-100 text-rose-800 border-rose-200',
      tranquil: 'bg-teal-100 text-teal-800 border-teal-200'
    };
    return colors[emotion as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (compact) {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-200">
        <div className="flex items-center gap-2 mb-2">
          <Feather size={14} className="text-purple-600" />
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEmotionColor(haiku.emotion)}`}>
            {haiku.emotion}
          </span>
        </div>
        <div className="space-y-1">
          {haiku.lines.map((line, index) => (
            <p key={index} className="text-sm text-gray-700 italic">
              {line}
            </p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Feather className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium text-gray-800">Haiku</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEmotionColor(haiku.emotion)}`}>
              {haiku.emotion}
            </span>
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {haiku.theme}
            </span>
          </div>
        </div>

        <div className="text-center space-y-2 py-4">
          {haiku.lines.map((line, index) => (
            <p key={index} className="text-gray-800 font-medium italic text-lg leading-relaxed">
              {line}
            </p>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{formatTime(haiku.timestamp)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart size={12} />
            <span className="text-purple-600 font-medium">Generated</span>
          </div>
        </div>
      </div>
    </div>
  );
};