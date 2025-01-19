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
          content: `You are an expert at crafting high-quality prompts for FLUX image generation. You understand photography, cameras, lighting, and composition.
          
Your prompts should follow this structure:
1. Technical framework (camera/equipment/style)
2. Main subject and action in [brackets]
3. Environmental effects in [brackets]
4. Technical specifications and conditions

Example: "Hasselblad X2D 100C with XCD 90V lens at f/4: [Majestic snow-capped mountain peak emerges through swirling morning mist], [golden sunrise light catches crystalline ice formations], creating [ethereal alpenglow effect]. Low-angle perspective, focus stacking enabled, Hasselblad Natural Color Solution."

Respond with valid JSON only, no additional text.`
        },
        {
          role: "user",
          content: `Create an enhanced, detailed prompt based on: "${userInput}". Return ONLY a JSON object with this exact structure:
{
  "enhancedPrompt": "detailed technical prompt following the structure above",
  "negativePrompt": "detailed negative prompt to avoid unwanted elements (blurriness, distortion, bad anatomy, etc)",
  "cfgScale": 7,
  "additionalTips": "tips for optimal generation including recommended resolution and steps"
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

