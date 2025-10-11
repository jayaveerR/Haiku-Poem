import React, { useState, useEffect } from 'react';
import { Feather, Heart, Sparkles, RefreshCw, Copy, Download, Lightbulb, Shuffle, Camera } from 'lucide-react';
import { MdEmojiEmotions } from 'react-icons/md';
import { HaikuService } from '../services/haikuService';
import { HaikuArtCard } from './HaikuArtCard';
import { Haiku } from '../types';
import EmotionCamera from './EmotionCamera';

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
  const [isScanning, setIsScanning] = useState(false);
  const [isEmotionScanning, setIsEmotionScanning] = useState(false);
  const [detectedEmotion, setDetectedEmotion] = useState<string>('');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [emotionAnalysis, setEmotionAnalysis] = useState<{
    emotion: string;
    confidence: number;
    all_emotions: { [key: string]: number };
    method: string;
  } | null>(null);

  useEffect(() => {
    console.log("Gemini Debug: Detected emotion state updated:", detectedEmotion);
    console.log("Gemini Debug: Emotion analysis state updated:", emotionAnalysis);
  }, [detectedEmotion, emotionAnalysis]);

  const emotions = [
    'serene', 'melancholic', 'joyful', 'contemplative', 'nostalgic',
    'peaceful', 'mysterious', 'hopeful', 'wistful', 'tranquil'
  ];

  const generateHaiku = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      let haiku: Haiku;
      const promptToUse = customPrompt || imagePrompt || '';
      const emotionToUse = detectedEmotion || selectedEmotion;
      
      if (emotionToUse) {
        haiku = HaikuService.generateEmotionalHaiku(emotionToUse);
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
      // You could add a toast notification here
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

  const getDetectedEmotionColor = (emotion: string) => {
    const colors = {
      happy: 'bg-green-100 text-green-800 border-green-200',
      sad: 'bg-blue-100 text-blue-800 border-blue-200',
      angry: 'bg-red-100 text-red-800 border-red-200',
      surprise: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      neutral: 'bg-gray-100 text-gray-800 border-gray-200',
      fear: 'bg-purple-100 text-purple-800 border-purple-200',
      disgust: 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors[emotion as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const handleQRCodeDetected = (data: string) => {
    setCustomPrompt(data);
    setIsScanning(false);
  };

  const handleFaceEmotionDetected = (emotion: string, analysis?: any) => {
    console.log("Gemini Debug: handleFaceEmotionDetected called with:", { emotion, analysis });
    setDetectedEmotion(emotion);
    
    // Store detailed emotion analysis
    if (analysis) {
      setEmotionAnalysis(analysis);
    }
    
    // Map detected emotions to haiku emotions
    const emotionMap: { [key: string]: string } = {
      'happy': 'joyful',
      'sad': 'melancholic',
      'angry': 'mysterious',
      'surprise': 'hopeful',
      'neutral': 'serene',
      'fear': 'wistful',
      'disgust': 'contemplative'
    };
    
    setSelectedEmotion(emotionMap[emotion] || 'serene');
    setIsEmotionScanning(false);
  };

  // Add this function to handle emotion data from camera
  const handleCameraData = (data: string) => {
    // Check if data is an emotion (from face detection)
    const emotions = ['happy', 'sad', 'angry', 'surprise', 'neutral', 'fear', 'disgust'];
    if (emotions.includes(data.toLowerCase())) {
      handleFaceEmotionDetected(data.toLowerCase());
    } else {
      // Assume it's QR code data
      handleQRCodeDetected(data);
    }
    setIsScanning(false);
  };

  const clearDetectedEmotion = () => {
    setDetectedEmotion('');
    setSelectedEmotion('');
    setEmotionAnalysis(null);
  };

  const EmotionBar = ({ emotion, score }: { emotion: string; score: number }) => (
    <div className="flex items-center justify-between gap-2 mb-2">
      <span className="capitalize text-sm text-gray-700 w-20">{emotion}:</span>
      <div className="flex-1 bg-gray-200 rounded-full h-3">
        <div
          className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
          style={{ width: `${score}%` }}
        ></div>
      </div>
      <span className="text-sm text-gray-600 w-10 text-right">{score.toFixed(1)}%</span>
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      
      
      <EmotionCamera 
        isScanning={isEmotionScanning}
        onClose={() => setIsEmotionScanning(false)}
        onEmotionDetected={handleFaceEmotionDetected}
        cameraError={cameraError}
      />
      
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Feather className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Haiku Generator</h3>
          </div>

          {/* Detected Emotion Display */}
          {detectedEmotion && emotionAnalysis && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200 p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-blue-800">
                  <MdEmojiEmotions className="text-blue-600 text-lg" />
                  <span className="text-lg">Emotion Detected!</span>
                </div>
                <button
                  onClick={clearDetectedEmotion}
                  className="text-xs text-red-600 hover:text-red-800 hover:bg-red-50 px-2 py-1 rounded transition-colors"
                >
                  Clear
                </button>
              </div>
              
              {/* Main Emotion Display */}
              <div className="text-center mb-4">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-lg font-bold border-2 ${getDetectedEmotionColor(detectedEmotion)}`}>
                  <span className="text-2xl">
                    {detectedEmotion === 'happy' && '😊'}
                    {detectedEmotion === 'sad' && '😢'}
                    {detectedEmotion === 'angry' && '😠'}
                    {detectedEmotion === 'surprise' && '😲'}
                    {detectedEmotion === 'neutral' && '😐'}
                    {detectedEmotion === 'fear' && '😨'}
                    {detectedEmotion === 'disgust' && '🤢'}
                  </span>
                  <span className="capitalize">{detectedEmotion}</span>
                  <span className="text-sm font-normal text-gray-600">
                    ({emotionAnalysis.confidence.toFixed(1)}% confidence)
                  </span>
                </div>
              </div>

              {/* All Emotions Breakdown */}
              <div className="bg-white rounded-lg p-3 border border-blue-100">
                <h4 className="text-sm font-semibold text-gray-800 mb-3 text-center">
                  Emotion Analysis
                </h4>
                <div className="space-y-1">
                  {Object.entries(emotionAnalysis.all_emotions)
                    .sort(([,a], [,b]) => b - a)
                    .map(([emotion, score]) => (
                      <EmotionBar key={emotion} emotion={emotion} score={score} />
                    ))
                  }
                </div>
                <div className="text-xs text-gray-500 text-center mt-2">
                  Using {emotionAnalysis.method} analysis
                </div>
              </div>

              {/* Mapped Haiku Emotion */}
              <div className="mt-3 text-center">
                <div className="text-sm text-gray-600">
                  Mapped to haiku emotion:{' '}
                  <span className={`font-semibold ${getEmotionColor(selectedEmotion)} px-2 py-1 rounded-full`}>
                    {selectedEmotion}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Custom Prompt Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Haiku Inspiration (Optional)</label>
            <div className="relative">
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Enter a theme, feeling, or scene for your haiku... (e.g., 'cherry blossoms falling in spring breeze')"
                className="w-full px-3 py-2 pr-24 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm resize-none"
                rows={2}
              />
              <div className="absolute right-2 top-2 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setIsScanning(true)}
                  className="p-1 text-gray-400 hover:text-purple-600 transition-colors"
                  title="Scan QR code"
                >
                  <Camera size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsEmotionScanning(true)}
                  className="p-1 text-gray-400 hover:text-purple-600 transition-colors"
                  title="Detect face emotion"
                >
                  <MdEmojiEmotions size={16} />
                </button>
                <button
                  type="button"
                  onClick={handleRandomPrompt}
                  className="p-1 text-gray-400 hover:text-purple-600 transition-colors"
                  title="Random prompt"
                >
                  <Shuffle size={16} />
                </button>
              </div>
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

                {currentHaiku.emotion && (
                  <div className="text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getEmotionColor(currentHaiku.emotion)}`}>
                      {currentHaiku.emotion}
                    </span>
                  </div>
                )}

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

      {/* Camera Features Info */}
      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-200 p-4">
        <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <Camera size={16} className="text-orange-600" />
          Camera Features
        </h4>
        <div className="text-xs text-gray-700 space-y-2">
          <p><strong>QR Code Scanning:</strong> Scan QR codes to get haiku prompts automatically</p>
          <p><strong>Face Emotion Detection:</strong> Point camera at your face to detect emotions and generate matching haikus</p>
          <p><strong>Real-time Analysis:</strong> Get instant emotion detection with confidence scores</p>
          <div className="mt-2 text-xs text-orange-600">
            <strong>Note:</strong> Make sure the Flask backend is running on port 5000 for emotion detection
          </div>
        </div>
      </div>

      {/* Emotion Mapping Info */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-4">
        <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <MdEmojiEmotions className="text-purple-600" />
          Emotion Mapping
        </h4>
        <div className="text-xs text-gray-700 grid grid-cols-2 gap-1">
          <div><strong>Happy</strong> → Joyful</div>
          <div><strong>Sad</strong> → Melancholic</div>
          <div><strong>Angry</strong> → Mysterious</div>
          <div><strong>Surprise</strong> → Hopeful</div>
          <div><strong>Neutral</strong> → Serene</div>
          <div><strong>Fear</strong> → Wistful</div>
          <div><strong>Disgust</strong> → Contemplative</div>
        </div>
      </div>
    </div>
  );
};