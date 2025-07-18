import React, { useState } from 'react';
import { Send, Sparkles, Lightbulb, Shuffle } from 'lucide-react';

interface PromptInputProps {
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
}

const EXAMPLE_PROMPTS = [
  // Fantasy
  "a dragon flying over a burning city at sunset",
  "a magical forest with glowing trees and fairy lights",
  "a wizard casting a glowing spell in a dark forest",
  "an enchanted castle floating in the clouds",
  
  // Nature & Landscapes
  "a quiet mountain lake surrounded by pine trees",
  "a field of sunflowers under a starry night sky",
  "a waterfall cascading into a crystal clear pool",
  "northern lights dancing over a snowy landscape",
  
  // Animals
  "a golden retriever puppy sitting in a field of flowers",
  "a majestic lion with a flowing mane in golden light",
  "a colorful parrot perched on a tropical branch",
  "a cat wearing a space suit floating in zero gravity",
  
  // Sci-fi & Futuristic
  "a futuristic city on Mars at night with neon lights",
  "a robot gardener tending to a rooftop garden",
  "a spaceship landing on an alien planet",
  "a cyberpunk street scene with holographic advertisements",
  
  // Artistic & Abstract
  "an old library with glowing books and floating pages",
  "a steampunk airship sailing through cloudy skies",
  "a vintage train station in the early morning mist",
  "a cozy coffee shop on a rainy day with warm lighting"
];

export const PromptInput: React.FC<PromptInputProps> = ({ onGenerate, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onGenerate(prompt.trim());
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
    setShowSuggestions(false);
  };

  const handleRandomPrompt = () => {
    const randomPrompt = EXAMPLE_PROMPTS[Math.floor(Math.random() * EXAMPLE_PROMPTS.length)];
    setPrompt(randomPrompt);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to create... (e.g., a dragon flying over a burning city at sunset)"
            className="w-full px-4 py-4 pr-24 text-gray-800 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[100px] shadow-sm transition-all duration-200 text-base"
            rows={4}
            disabled={isLoading}
          />
          <div className="absolute right-2 bottom-2 flex gap-2">
            <button
              type="button"
              onClick={handleRandomPrompt}
              disabled={isLoading}
              className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              title="Random prompt"
            >
              <Shuffle size={18} />
            </button>
            <button
              type="submit"
              disabled={!prompt.trim() || isLoading}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2 font-medium"
            >
              <Send size={18} />
              Generate
            </button>
          </div>
        </div>
      </form>

      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowSuggestions(!showSuggestions)}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 rounded-lg hover:bg-blue-50"
        >
          <Lightbulb size={16} />
          {showSuggestions ? 'Hide' : 'Show'} Examples
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Sparkles size={16} />
          <span>AI-powered image generation</span>
        </div>
      </div>

      {showSuggestions && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100">
          <div className="sm:col-span-2 mb-2">
            <h4 className="text-sm font-semibold text-gray-800 mb-1">Example Prompts</h4>
            <p className="text-xs text-gray-600">Click any example to use it as your prompt</p>
          </div>
          {EXAMPLE_PROMPTS.slice(0, 8).map((example, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(example)}
              className="text-left p-3 text-sm text-gray-700 hover:text-blue-600 hover:bg-white rounded-lg transition-all duration-200 border border-transparent hover:border-blue-200 hover:shadow-sm"
            >
              "{example}"
            </button>
          ))}
        </div>
      )}
    </div>
  );
};