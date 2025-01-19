'use server'

import openai from './openai'
import { enhancePrompt } from './utils'

export async function generatePrompt(userInput: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "meta-llama/Llama-3.3-70B-Instruct-fast",
      messages: [
        {
          role: "system",
          content: `You are the world's best prompt engineer for FLUX image generation, with deep expertise in photography, digital art, graphic design, and visual aesthetics.

For photography-based prompts, use this structure:
[Camera & Lens] + [Main Subject & Action] + [Environmental Effects] + [Technical Details]
Example: "Hasselblad X2D 100C with XCD 90V lens at f/4: [Majestic snow-capped mountain peak emerges through swirling morning mist], [golden sunrise light catches crystalline ice formations], creating [ethereal alpenglow effect]. Low-angle perspective, focus stacking enabled, Hasselblad Natural Color Solution."

For digital art/logos/illustrations, use this structure:
[Style & Technique] + [Main Element] + [Design Elements] + [Technical Specifications]
Example: "Minimalist vector art style: [Abstract phoenix logo emerging from geometric shapes], [gradient flame effects in corporate blue and gold], implementing [clean negative space principles]. Sharp vector edges, 300 DPI, perfect symmetry, professional brand guidelines."

For anime/cartoon/stylized art, use this structure:
[Art Style Reference] + [Character/Scene] + [Mood/Lighting] + [Style Details]
Example: "Studio Ghibli meets Makoto Shinkai aesthetic: [Young witch practicing spells], [magical particles swirl through dusty sunset light], featuring [detailed background art with multiple parallax layers]. Volumetric lighting, cel shading, signature anime elements."

Always analyze the input to determine the most appropriate structure and technical specifications. Focus on the intended use case and optimize accordingly.`
        },
        {
          role: "user",
          content: `Create an enhanced prompt based on: "${userInput}". Return ONLY a JSON object with this structure:
{
  "enhancedPrompt": "detailed prompt using the appropriate structure",
  "negativePrompt": "comprehensive negative prompt specific to the style and use case",
  "cfgScale": 7,
  "additionalTips": "tips for optimal generation"
}`
        }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    })

    const result = completion.choices[0]?.message?.content || ''
    
    try {
      const parsedResult = JSON.parse(result)
      
      if (!parsedResult.enhancedPrompt || 
          !parsedResult.negativePrompt || 
          typeof parsedResult.cfgScale !== 'number' || 
          !parsedResult.additionalTips) {
        throw new Error('Invalid response structure')
      }

      return parsedResult
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError, 'Raw response:', result)
      throw new Error('Failed to parse AI response')
    }
  } catch (error) {
    console.error('Error in generatePrompt:', error)
    throw error
  }
}

type ImageGenerationResponse = {
  data: Array<{
    url?: string;
    b64_json?: string;
  }>;
  id: string;
}

export async function generateImage(prompt: string, negativePrompt: string) {
  try {
    const response = await openai.images.generate({
      model: "black-forest-labs/flux-schnell",
      prompt: `${prompt} ### Negative prompt: ${negativePrompt}`,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    return response.data[0].url;
  } catch (error) {
    console.error('Error generating image:', error);
    throw new Error('Failed to generate image');
  }
}

