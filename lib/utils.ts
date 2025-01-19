import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function enhancePrompt(userInput: string): string {
  return `Based on the user's input: "${userInput}", generate an enhanced prompt for FLUX.1 image generation. 

Your response MUST be a valid JSON object with the following structure:
{
  "enhancedPrompt": "A detailed, enhanced prompt for FLUX.1 image generation",
  "negativePrompt": "A suitable negative prompt to avoid unwanted elements",
  "cfgScale": 7,
  "additionalTips": "Any additional tips for optimal FLUX.1 generation"
}

Ensure that:
1. The "enhancedPrompt" includes specific details about the subject, style, composition, lighting, color palette, mood, and any additional elements that would improve the image quality.
2. The "negativePrompt" helps avoid unwanted elements or styles in the generated image.
3. The "cfgScale" is a number between 1 and 30.
4. The "additionalTips" provide any relevant advice for using this prompt with FLUX.1.

Remember, your entire response must be a valid JSON object.`
}

