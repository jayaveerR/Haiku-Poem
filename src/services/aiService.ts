export class AIService {
  private static readonly CLIPDROP_API_KEY = import.meta.env.VITE_CLIPDROP_API_KEY;
  private static readonly CLIPDROP_API_URL = 'https://clipdrop-api.co/text-to-image/v1';

  static async generateImage(prompt: string, style: string = 'fantasy'): Promise<string> {
    if (!this.CLIPDROP_API_KEY) {
      throw new Error('ClipDrop API key not configured');
    }

    try {
      const formData = new FormData();
      formData.append('prompt', prompt);
      
      const response = await fetch(this.CLIPDROP_API_URL, {
        method: 'POST',
        headers: {
          'x-api-key': this.CLIPDROP_API_KEY,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`ClipDrop API error: ${response.status}`);
      }

      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Failed to generate image:', error);
      // Fallback to a placeholder image service
      return `https://picsum.photos/800/600?random=${Date.now()}`;
    }
  }

  static async downloadImage(imageUrl: string, filename: string): Promise<void> {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download image:', error);
      throw error;
    }
  }
}