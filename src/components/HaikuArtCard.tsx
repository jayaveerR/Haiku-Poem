import React, { useState, useRef } from 'react';
import { Download, Sparkles, Palette, Image, FileText } from 'lucide-react';
import { AIService } from '../services/aiService';

interface HaikuArtCardProps {
  haiku: {
    lines: [string, string, string];
    emotion: string;
    theme: string;
  };
  onGenerate?: () => void;
}

export const HaikuArtCard: React.FC<HaikuArtCardProps> = ({ haiku, onGenerate }) => {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const generateArtCard = async () => {
    setIsGenerating(true);
    try {
      // Create a detailed prompt based on the haiku
      const prompt = `${haiku.lines.join(' ')}, ${haiku.emotion} mood, soft pastel tones, dreamy atmosphere, beautiful landscape, ethereal lighting, peaceful scene, fantasy art style, high quality, detailed, 4k resolution`;
      
      const imageUrl = await AIService.generateImage(prompt, 'fantasy');
      setBackgroundImage(imageUrl);
      setShowAnimation(true);
    } catch (error) {
      console.error('Failed to generate art card:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadHaikuText = () => {
    const haikuText = haiku.lines.join('\n');
    const blob = new Blob([haikuText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `haiku-poem-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadBackgroundImage = async () => {
    if (backgroundImage) {
      try {
        await AIService.downloadImage(backgroundImage, `haiku-background-${Date.now()}.png`);
      } catch (error) {
        console.error('Failed to download background image:', error);
      }
    }
  };

  const downloadArtCard = async () => {
    if (!cardRef.current) return;

    try {
      // Wait a moment for any animations to complete
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        foreignObjectRendering: false,
        logging: true,
        onclone: (clonedDoc) => {
          // Ensure background images are properly loaded in the clone
          const clonedCard = clonedDoc.querySelector('[data-card-ref]');
          if (clonedCard && backgroundImage) {
            (clonedCard as HTMLElement).style.backgroundImage = `url(${backgroundImage})`;
            (clonedCard as HTMLElement).style.backgroundSize = 'cover';
            (clonedCard as HTMLElement).style.backgroundPosition = 'center';
            (clonedCard as HTMLElement).style.backgroundRepeat = 'no-repeat';
          }
        }
      });

      const link = document.createElement('a');
      link.download = `haiku-art-card-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Failed to download art card:', error);
      // Show user-friendly error message
      alert('Failed to download the art card. Please try again or download the background image separately.');
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {/* Download Options */}
        <button
          onClick={downloadHaikuText}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg text-sm"
        >
          <FileText size={16} />
          Download Poem
        </button>

        <button
          onClick={generateArtCard}
          disabled={isGenerating}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg text-sm"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Generating Background...
            </>
          ) : (
            <>
              <Palette size={16} />
              Create Visual Background
            </>
          )}
        </button>

        {backgroundImage && (
          <>
            <button
              onClick={downloadBackgroundImage}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium shadow-lg text-sm"
            >
              <Image size={16} />
              Download Background
            </button>
            
            <button
              onClick={downloadArtCard}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 transition-all duration-200 font-medium shadow-lg text-sm"
            >
              <Download size={16} />
              Download Full Card
            </button>
          </>
        )}
      </div>

      {/* Auto-generate background on haiku creation */}
      {!backgroundImage && !isGenerating && (
        <div className="text-center mb-6">
          <button
            onClick={generateArtCard}
            className="text-sm text-purple-600 hover:text-purple-800 underline transition-colors"
          >
            Click to create a visual background for your haiku
          </button>
        </div>
      )}

      {/* Art Card */}
      <div
        ref={cardRef}
        data-card-ref="true"
        className={`relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl transition-all duration-1000 ${
          backgroundImage ? 'opacity-100' : 'opacity-50'
        }`}
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Floating Petals Animation */}
        {showAnimation && (
          <>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-pink-300 rounded-full opacity-70 animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                }}
              />
            ))}
          </>
        )}

        {/* Haiku Text */}
        <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center">
          <div className="space-y-6">
            {haiku.lines.map((line, index) => (
              <div
                key={index}
                className={`text-white font-serif text-2xl md:text-3xl leading-relaxed transition-all duration-1000 ${
                  showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{
                  animationDelay: `${index * 0.5}s`,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                  filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))',
                }}
              >
                <span className="inline-block animate-glow">{line}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sparkle Effects */}
        {showAnimation && (
          <>
            {[...Array(12)].map((_, i) => (
              <div
                key={`sparkle-${i}`}
                className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-twinkle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${2 + Math.random()}s`,
                }}
              />
            ))}
          </>
        )}

        {/* Gradient Border Effect */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 opacity-50 animate-pulse" 
             style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude' }} />
      </div>

      {/* Instructions */}
      <div className="text-center text-sm text-gray-600 bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
        <p className="mb-2">
          <Sparkles className="inline w-4 h-4 mr-1" />
          <strong>Beautiful Art Cards:</strong> Create stunning visual backgrounds for your haiku and download in multiple formats
        </p>
        <p className="text-xs text-gray-500">
          AI generates imagery based on your haiku's themes and emotions, creating a perfect visual companion to your poetry
        </p>
      </div>
    </div>
  );
};