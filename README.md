# ImageAI - ClipDrop Text-to-Image Generator

A modern web application that generates stunning AI images from text prompts using ClipDrop's Stable Diffusion XL API.

## Features

- 🎨 Multiple art styles (Realistic, Fantasy, Cartoon, Anime, Sketch, Oil Painting, Cyberpunk, Vintage)
- ⚡ Fast image generation with ClipDrop API
- 📱 Responsive design for all devices
- 💾 Download generated images
- 🎯 Intuitive prompt suggestions
- 🖼️ Gallery of generated images

## Setup

1. **Get ClipDrop API Key**
   - Visit [ClipDrop API](https://clipdrop.co/apis/docs/text-to-image)
   - Sign up and get your API key
   - Copy your API key (starts with `sk-...`)

2. **Configure Environment**
   - Open the `.env` file in the project root
   - Replace `your_clipdrop_api_key_here` with your actual API key:
   ```
   VITE_CLIPDROP_API_KEY=sk-your-actual-api-key-here
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## API Integration

This app uses the ClipDrop Text-to-Image API which provides:
- High-quality Stable Diffusion XL models
- Multiple artistic styles
- Fast generation times
- Reliable service

### Supported Styles

- **Photographic**: Realistic, detailed images
- **Fantasy Art**: Magical and mystical scenes
- **Comic Book**: Cartoon and animated style
- **Anime**: Japanese animation style
- **Line Art**: Sketch and pencil drawings
- **Digital Art**: Painted and artistic styles
- **3D Model**: Futuristic and cyberpunk themes

## Usage

1. Enter a descriptive text prompt
2. Select your preferred art style
3. Click "Generate" to create your image
4. Download or share your creation

### Example Prompts

- "a dragon flying over a burning city at sunset"
- "a magical forest with glowing trees and fairy lights"
- "a cyberpunk street scene with neon lights"
- "a pencil sketch of a cat wearing a space suit"

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS
- **Icons**: Lucide React
- **API**: ClipDrop Stable Diffusion XL
- **Build Tool**: Vite

## Deployment

The app can be deployed to any static hosting service like Netlify, Vercel, or GitHub Pages. Make sure to set your environment variables in your hosting platform's settings.

## License

MIT License - feel free to use this project for your own applications!