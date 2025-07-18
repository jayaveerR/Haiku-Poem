import { Haiku } from '../types';

const EMOTIONS = [
  'serene', 'melancholic', 'joyful', 'contemplative', 'nostalgic', 
  'peaceful', 'mysterious', 'hopeful', 'wistful', 'tranquil'
];

const HAIKU_TEMPLATES = {
  nature: [
    ['Cherry blossoms fall', 'Petals dance on gentle breeze', 'Spring whispers goodbye'],
    ['Mountain lake reflects', 'Clouds drift across azure sky', 'Silence speaks volumes'],
    ['Autumn leaves spiral', 'Golden memories descend', 'Time flows like water'],
    ['Morning dew glistens', 'On grass blades touched by first light', 'Dawn breaks the darkness'],
    ['Ocean waves retreat', 'Leaving shells and sandy dreams', 'Tides carry secrets'],
    ['Pine trees stand silent', 'Ancient guardians of the earth', 'Wisdom in their rings'],
    ['Butterfly alights', 'On purple flower in meadow', 'Beauty finds beauty'],
    ['Rain drops kiss the earth', 'Awakening sleeping seeds', 'Life stirs beneath soil'],
    ['Moonbeams paint silver', 'Paths across the sleeping lake', 'Night holds gentle peace'],
    ['Wind whispers through grass', 'Telling stories of the past', 'Earth remembers all']
  ],
  emotions: [
    ['Heart beats like thunder', 'In the quiet of the night', 'Love echoes softly'],
    ['Tears fall like spring rain', 'Washing away yesterday', 'Hope blooms in sorrow'],
    ['Laughter fills the air', 'Like birds singing at sunrise', 'Joy knows no boundaries'],
    ['Memories linger', 'In the corners of the mind', 'Past and present merge'],
    ['Dreams take flight at dusk', 'Carrying wishes skyward', 'Tomorrow awaits'],
    ['Loneliness settles', 'Like mist upon the valley', 'Solitude teaches'],
    ['Gentle hands embrace', 'Healing wounds that time forgot', 'Love conquers all pain'],
    ['Silent tears of joy', 'Fall like petals from the heart', 'Happiness overflows'],
    ['Peaceful mind rests here', 'In the garden of the soul', 'Serenity blooms'],
    ['Nostalgia calls out', 'From photographs and old songs', 'Yesterday lives on']
  ],
  seasons: [
    ['Winter wind whispers', 'Through bare branches reaching high', 'Rest before rebirth'],
    ['Summer sun blazes', 'Painting shadows on warm earth', 'Life in full glory'],
    ['Spring rain awakens', 'Seeds sleeping beneath the soil', 'New life stirs within'],
    ['Autumn moon rises', 'Over fields of golden grain', 'Harvest time has come'],
    ['First snow of winter', 'Blankets the world in silence', 'Peace covers the earth'],
    ['Cherry blossoms bloom', 'Pink clouds floating on spring breeze', 'Beauty is fleeting'],
    ['Summer cicadas', 'Sing their ancient songs of heat', 'Time moves with their rhythm'],
    ['Falling autumn leaves', 'Dance their way to earth below', 'Seasons turn and turn'],
    ['Winter stars shine bright', 'In the crystal clear night sky', 'Cold reveals the light'],
    ['Spring\'s first green shoots', 'Push through snow to greet the sun', 'Hope never surrenders']
  ],
  mystical: [
    ['Stars write ancient songs', 'In the language of the night', 'Universe listens'],
    ['Moonbeams paint silver', 'Paths across the sleeping world', 'Magic walks among us'],
    ['Shadows dance and play', 'In the flickering candlelight', 'Spirits come alive'],
    ['Mist veils the mountain', 'Hiding secrets of the earth', 'Mystery endures'],
    ['Temple bells ring out', 'Calling souls to meditation', 'Peace flows like water'],
    ['Ancient tree stands tall', 'Keeper of a thousand years', 'Wisdom in its bark'],
    ['Candle flame flickers', 'Dancing with invisible wind', 'Light conquers darkness'],
    ['Prayer flags flutter', 'Carrying hopes to the heavens', 'Faith rides on the breeze'],
    ['Sacred silence holds', 'All the answers we seek', 'Truth lives in stillness'],
    ['Spirit of the forest', 'Whispers through the rustling leaves', 'Nature speaks to those who listen']
  ],
  moments: [
    ['Old man feeds the birds', 'Crumbs of kindness shared each day', 'Love multiplies'],
    ['Child takes first steps', 'Wobbling toward waiting arms', 'Trust leads the way'],
    ['Grandmother\'s hands', 'Knead dough with decades of love', 'Tradition lives on'],
    ['Lovers walk at sunset', 'Shadows merge as hearts unite', 'Two become as one'],
    ['Student reads by candlelight', 'Knowledge glows in the darkness', 'Learning lights the mind'],
    ['Fisherman waits patiently', 'Rod bent over quiet water', 'Patience teaches peace'],
    ['Mother sings lullaby', 'Voice like honey in the night', 'Love wraps around dreams'],
    ['Friends share evening tea', 'Steam rises with their laughter', 'Friendship warms the soul'],
    ['Traveler rests under tree', 'Shade offers welcome respite', 'Journey finds its rhythm'],
    ['Artist paints the dawn', 'Capturing light on canvas', 'Beauty lives forever']
  ]
};

export class HaikuService {
  static generateHaiku(prompt: string, emotion?: string): Haiku {
    // Determine theme based on prompt keywords
    let theme = 'emotions'; // default
    const promptLower = prompt.toLowerCase();
    
    if (promptLower.includes('nature') || promptLower.includes('forest') || 
        promptLower.includes('tree') || promptLower.includes('flower') ||
        promptLower.includes('mountain') || promptLower.includes('ocean') ||
        promptLower.includes('lake') || promptLower.includes('river') ||
        promptLower.includes('bird') || promptLower.includes('butterfly') ||
        promptLower.includes('rain') || promptLower.includes('wind') ||
        promptLower.includes('grass') || promptLower.includes('leaf') ||
        promptLower.includes('petal') || promptLower.includes('branch')) {
      theme = 'nature';
    } else if (promptLower.includes('winter') || promptLower.includes('summer') ||
               promptLower.includes('spring') || promptLower.includes('autumn') ||
               promptLower.includes('season') || promptLower.includes('snow') ||
               promptLower.includes('blossom') || promptLower.includes('harvest')) {
      theme = 'seasons';
    } else if (promptLower.includes('magic') || promptLower.includes('mystical') ||
               promptLower.includes('fantasy') || promptLower.includes('dream') ||
               promptLower.includes('star') || promptLower.includes('moon') ||
               promptLower.includes('spirit') || promptLower.includes('temple') ||
               promptLower.includes('ancient') || promptLower.includes('sacred')) {
      theme = 'mystical';
    } else if (promptLower.includes('old man') || promptLower.includes('child') ||
               promptLower.includes('mother') || promptLower.includes('grandmother') ||
               promptLower.includes('lover') || promptLower.includes('friend') ||
               promptLower.includes('student') || promptLower.includes('artist') ||
               promptLower.includes('traveler') || promptLower.includes('fisherman')) {
      theme = 'moments';
    }

    // Select random haiku from theme
    const themeHaikus = HAIKU_TEMPLATES[theme as keyof typeof HAIKU_TEMPLATES];
    const selectedHaiku = themeHaikus[Math.floor(Math.random() * themeHaikus.length)];
    
    // Select emotion
    const selectedEmotion = emotion || EMOTIONS[Math.floor(Math.random() * EMOTIONS.length)];

    return {
      id: Date.now().toString(),
      lines: selectedHaiku as [string, string, string],
      emotion: selectedEmotion,
      theme,
      timestamp: Date.now()
    };
  }

  static generateEmotionalHaiku(emotion: string): Haiku {
    const emotionalPrompts = {
      serene: 'peaceful mountain lake',
      melancholic: 'autumn rain falling',
      joyful: 'spring flowers blooming',
      contemplative: 'temple meditation',
      nostalgic: 'childhood memories',
      peaceful: 'quiet forest glade',
      mysterious: 'moonlit forest path',
      hopeful: 'sunrise over horizon',
      wistful: 'distant memories',
      tranquil: 'gentle flowing stream'
    };

    const prompt = emotionalPrompts[emotion as keyof typeof emotionalPrompts] || 'peaceful scene';
    return this.generateHaiku(prompt, emotion);
  }

  static getRandomEmotion(): string {
    return EMOTIONS[Math.floor(Math.random() * EMOTIONS.length)];
  }

  static getHaikuPromptSuggestions(): string[] {
    return [
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
  }
}