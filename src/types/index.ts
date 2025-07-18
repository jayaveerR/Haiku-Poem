export interface GenerationRequest {
  prompt: string;
  style?: string;
  negative_prompt?: string;
  num_inference_steps?: number;
  guidance_scale?: number;
  width?: number;
  height?: number;
}

export interface GenerationResponse {
  images: string[];
  parameters: {
    prompt: string;
    negative_prompt?: string;
    num_inference_steps: number;
    guidance_scale: number;
    width: number;
    height: number;
  };
}

export interface GeneratedImage {
  id: string;
  prompt: string;
  imageUrl: string;
  timestamp: number;
  style?: string;
  haiku?: Haiku;
}

export interface Haiku {
  id: string;
  lines: [string, string, string];
  emotion: string;
  theme: string;
  timestamp: number;
}

export interface ApiError {
  error: string;
  details?: string;
}

export interface ImageStyle {
  id: string;
  name: string;
  description: string;
  prompt_suffix: string;
  negative_prompt?: string;
  icon: string;
  clipdrop_style?: string;
}