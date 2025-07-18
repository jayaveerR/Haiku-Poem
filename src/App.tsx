import React, { useState } from 'react';
import { Palette } from 'lucide-react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { StyleSelector } from './components/StyleSelector';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import { Gallery } from './components/Gallery';
import { HaikuGenerator } from './components/HaikuGenerator';
import { AIService } from './services/aiService';
import { GeneratedImage, Haiku } from './types';

function App() {
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('realistic');
  const [activeTab, setActiveTab] = useState<'images' | 'haiku'>('images');

  const handleGenerate = async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    setCurrentPrompt(prompt);

    try {
      const imageUrl = await AIService.generateImage(prompt, selectedStyle);
      
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        prompt,
        imageUrl,
        timestamp: Date.now(),
        style: selectedStyle,
      };

      setImages(prev => [newImage, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate image');
    } finally {
      setIsLoading(false);
    }
  };

  const handleHaikuGenerated = (haiku: Haiku) => {
    // If there's a latest image, attach the haiku to it
    if (images.length > 0) {
      setImages(prev => prev.map((img, index) => 
        index === 0 ? { ...img, haiku } : img
      ));
    }
  };

  const handleRetry = () => {
    if (currentPrompt) {
      handleGenerate(currentPrompt);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-10 via-white to-purple-30">
      <Header />
      
      <main className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6 leading-tight">
YOUR FEELINGS..{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              GENETATE..YOUR FEELINGS
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
           
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl p-1 shadow-sm border border-gray-200">
            <button
              onClick={() => setActiveTab('images')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'images'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              🎨 Image Generator
            </button>
            <button
              onClick={() => setActiveTab('haiku')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'haiku'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              🌸 Haiku Generator
            </button>
          </div>
        </div>

        {activeTab === 'images' ? (
          <>
            {/* Style Selection */}
            <div className="mb-8">
              <StyleSelector 
                selectedStyle={selectedStyle} 
                onStyleChange={setSelectedStyle} 
              />
            </div>

            {/* Prompt Input */}
            <div className="mb-12">
              <PromptInput onGenerate={handleGenerate} isLoading={isLoading} />
            </div>

            {/* Loading/Error States */}
            <div className="mb-12">
              {isLoading && (
                <div className="flex justify-center">
                  <LoadingState prompt={currentPrompt} />
                </div>
              )}

              {error && (
                <div className="flex justify-center">
                  <ErrorState error={error} onRetry={handleRetry} />
                </div>
              )}
            </div>

            {/* Gallery */}
            <Gallery images={images} />
          </>
        ) : (
          <div className="space-y-8">
            {/* Main Title */}
            <div className="text-center mb-12">
              <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4 animate-gradient-text">
              Haiku-Poem..
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Create beautiful haiku poetry and transform it into stunning visual art cards with AI-generated imagery
              </p>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {/* Left Side - Haiku Generator */}
              <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-200 p-6 animate-slideInLeft hover:shadow-2xl transition-all duration-500 hover:scale-105">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-bounce-slow">
                      ✨
                    </span>
                    Create Your Haiku
                  </h2>
                  <HaikuGenerator 
                    imagePrompt={currentPrompt}
                    onHaikuGenerated={handleHaikuGenerated}
                  />
                </div>
              </div>

              {/* Right Side - Image Generator */}
              <div className="space-y-6">
                <div className="">
                  <h2 className="">
                    <span className="">
                      
                    </span>
                 
                  </h2>
                  <div className="text-center py-8">
                    {images.length === 0 ? (
                      <div className="">
                        <div className="">
                      
                        </div>
              
                      </div>
                    ) : (
                      <div className="">
                        <img 
                          src={images[0].imageUrl} 
                          alt="Latest generated image"
                          className=""
                        />
                        <p className="text-sm text-gray-600 italic">"{images[0].prompt}"</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Pro Tip */}
            <div className="text-center text-sm text-gray-600 bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200 max-w-4xl mx-auto animate-fadeIn hover:shadow-lg transition-all duration-300">
              <p className="mb-2 text-lg">✨ <strong>How it works:</strong></p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-200">
                  <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  <span>Create your haiku poem</span>
                </div>
                <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-200">
                  <span className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <span>Create visual backgrounds</span>
                </div>
                <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-200">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  <span>Download your art card</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white/90 backdrop-blur-sm mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="font-semibold">Powered by Advanced AI Technology</span>
            </div>
            <p className="text-sm text-gray-500 max-w-2xl mx-auto">
              Built with React, TypeScript & Tailwind CSS • Using ClipDrop API & AI Poetry Generation • 
              Free to use for everyone • No registration required
            </p>
            <div className="flex items-center justify-center gap-6 text-xs text-gray-400">
              <span>© 2024 ImageAI</span>
              <span>•</span>
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;