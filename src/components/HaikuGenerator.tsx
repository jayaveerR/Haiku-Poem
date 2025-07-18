import React, { useState } from 'react';
import { Feather, Heart, Sparkles, RefreshCw, Copy, Download, Lightbulb, Shuffle } from 'lucide-react';
import { HaikuService } from '../services/haikuService';
import { HaikuArtCard } from './HaikuArtCard';
import { Haiku } from '../types';

interface HaikuGeneratorProps {
  imagePrompt?: string;
  onHaikuGenerated?: (haiku: Haiku) => void;
}

const HAIKU_PROMPTS = [
  // Nature & Seasons
  "cherry blossoms falling in spring breeze",
  "autumn leaves dancing in the wind",
  "morning dew on grass blades",
  "winter snow covering pine trees",
  "ocean waves crashing on shore",
  "mountain lake reflecting clouds",
  "sunset painting the sky orange",
  "rain drops on window glass",
  "butterfly landing on flower",
  "moonlight through forest trees",
  
  // Emotions & Feelings
  "longing for distant memories",
  "peaceful moment of solitude",
  "joy of childhood laughter",
  "melancholy of rainy days",
  "hope rising with dawn",
  "love blooming like flowers",
  "sadness of farewell",
  "wonder at starry night",
  "contentment in simple things",
  "nostalgia for summer days",
  
  // Life Moments
  "old man feeding birds",
  "child's first steps",
  "grandmother's gentle hands",
  "lovers walking at sunset",
  "student reading by candlelight",
  "fisherman waiting patiently",
  "mother singing lullaby",
  "friends sharing tea",
  "traveler resting under tree",
  "artist painting landscape",
  
  // Mystical & Spiritual
  "temple bells in morning mist",
  "meditation in bamboo grove",
  "prayer flags in mountain wind",
  "candle flame in darkness",
  "ancient wisdom in silence",
  "spirit of the forest",
  "dreams floating on clouds",
  "soul's journey through seasons",
  "harmony of earth and sky",
  "eternal dance of time"
];

export const HaikuGenerator: React.FC<HaikuGeneratorProps> = ({ 
  imagePrompt, 
  onHaikuGenerated 
}) => {
  const [currentHaiku, setCurrentHaiku] = useState<Haiku | null>(null);
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPromptSuggestions, setShowPromptSuggestions] = useState(false);

  const emotions = [
    'serene', 'melancholic', 'joyful', 'contemplative', 'nostalgic',
    'peaceful', 'mysterious', 'hopeful', 'wistful', 'tranquil'
  ];

  const generateHaiku = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      let haiku: Haiku;
      const promptToUse = customPrompt || imagePrompt || '';
      
      if (selectedEmotion) {
        haiku = HaikuService.generateEmotionalHaiku(selectedEmotion);
      } else if (promptToUse) {
        haiku = HaikuService.generateHaiku(promptToUse);
      } else {
        const randomEmotion = HaikuService.getRandomEmotion();
        haiku = HaikuService.generateEmotionalHaiku(randomEmotion);
      }
      
      setCurrentHaiku(haiku);
      onHaikuGenerated?.(haiku);
      setIsGenerating(false);
    }, 1000);
  };

  const handlePromptSuggestion = (suggestion: string) => {
    setCustomPrompt(suggestion);
    setShowPromptSuggestions(false);
  };

  const handleRandomPrompt = () => {
    const randomPrompt = HAIKU_PROMPTS[Math.floor(Math.random() * HAIKU_PROMPTS.length)];
    setCustomPrompt(randomPrompt);
  };

  const copyHaiku = () => {
    if (currentHaiku) {
      const haikuText = currentHaiku.lines.join('\n');
      navigator.clipboard.writeText(haikuText);
    }
  };

  const downloadHaiku = () => {
    if (currentHaiku) {
      const haikuText = currentHaiku.lines.join('\n');
      const blob = new Blob([haikuText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `haiku-${currentHaiku.id}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const getEmotionColor = (emotion: string) => {
    const colors = {
      serene: 'bg-blue-100 text-blue-800',
      melancholic: 'bg-gray-100 text-gray-800',
      joyful: 'bg-yellow-100 text-yellow-800',
      contemplative: 'bg-purple-100 text-purple-800',
      nostalgic: 'bg-amber-100 text-amber-800',
      peaceful: 'bg-green-100 text-green-800',
      mysterious: 'bg-indigo-100 text-indigo-800',
      hopeful: 'bg-pink-100 text-pink-800',
      wistful: 'bg-rose-100 text-rose-800',
      tranquil: 'bg-teal-100 text-teal-800'
    };
    return colors[emotion as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Feather className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Haiku Generator</h3>
          </div>

          {/* Custom Prompt Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Haiku Inspiration (Optional)</label>
            <div className="relative">
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Enter a theme, feeling, or scene for your haiku... (e.g., 'cherry blossoms falling in spring breeze')"
                className="w-full px-3 py-2 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm resize-none"
                rows={2}
              />
              <button
                type="button"
                onClick={handleRandomPrompt}
                className="absolute right-2 top-2 p-1 text-gray-400 hover:text-purple-600 transition-colors"
                title="Random prompt"
              >
                <Shuffle size={16} />
              </button>
            </div>
          </div>

          {/* Prompt Suggestions */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowPromptSuggestions(!showPromptSuggestions)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-purple-600 transition-colors duration-200 rounded-lg hover:bg-purple-50"
            >
              <Lightbulb size={16} />
              {showPromptSuggestions ? 'Hide' : 'Show'} Prompt Ideas
            </button>
          </div>

          {showPromptSuggestions && (
            <div className="grid grid-cols-1 gap-2 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100 max-h-48 overflow-y-auto">
              <div className="mb-2">
                <h4 className="text-sm font-semibold text-gray-800 mb-1">Haiku Prompt Ideas</h4>
                <p className="text-xs text-gray-600">Click any prompt to use it for your haiku</p>
              </div>
              {HAIKU_PROMPTS.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handlePromptSuggestion(prompt)}
                  className="text-left p-2 text-sm text-gray-700 hover:text-purple-600 hover:bg-white rounded-lg transition-all duration-200 border border-transparent hover:border-purple-200"
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          )}

          {/* Emotion Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Choose Emotion (Optional)</label>
            <select
              value={selectedEmotion}
              onChange={(e) => setSelectedEmotion(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            >
              <option value="">Random Emotion</option>
              {emotions.map((emotion) => (
                <option key={emotion} value={emotion}>
                  {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateHaiku}
            disabled={isGenerating}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Crafting Poetry...
              </>
            ) : (
              <>
                <Sparkles size={16} />
                Generate Haiku
              </>
            )}
          </button>

          {/* Generated Haiku */}
          {currentHaiku && (
            <div className="mt-6 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
              <div className="space-y-3">
                
                <div className="text-center space-y-1">
                  {currentHaiku.lines.map((line, index) => (
                    <p key={index} className="text-gray-800 font-medium italic text-lg">
                      {line}
                    </p>
                  ))}
                </div>

                <div className="flex justify-center gap-2 pt-2">
                  <button
                    onClick={copyHaiku}
                    className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-100 rounded-lg transition-all duration-200"
                    title="Copy haiku"
                  >
                    <Copy size={16} />
                  </button>
                  <button
                    onClick={downloadHaiku}
                    className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-100 rounded-lg transition-all duration-200"
                    title="Download haiku"
                  >
                    <Download size={16} />
                  </button>
                  <button
                    onClick={generateHaiku}
                    className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-100 rounded-lg transition-all duration-200"
                    title="Generate new haiku"
                  >
                    <RefreshCw size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Art Card Generator */}
        </div>
      </div>

      {/* Art Card Generator */}
      {currentHaiku && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <HaikuArtCard haiku={currentHaiku} />
        </div>
      )}

      {imagePrompt && (
        <div className="text-xs text-gray-500 bg-blue-50 p-2 rounded-lg border border-blue-200">
          <Heart size={12} className="inline mr-1" />
          Inspired by: "{imagePrompt.slice(0, 50)}..."
        </div>
      )}

      {/* Haiku Writing Tips */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border border-green-200 p-4">
        <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <Feather size={16} className="text-green-600" />
          Perfect Haiku Prompts
        </h4>
        <div className="text-xs text-gray-700 space-y-2">
          <p><strong>Nature:</strong> "morning dew on petals", "autumn wind through trees", "ocean waves at sunset"</p>
          <p><strong>Emotions:</strong> "longing for home", "peaceful solitude", "childhood memories"</p>
          <p><strong>Moments:</strong> "old man feeding birds", "lovers under moonlight", "child's first snow"</p>
          <p><strong>Seasons:</strong> "spring rain on roof", "summer cicadas singing", "winter silence"</p>
        </div>
      </div>
    </div>
  );
};