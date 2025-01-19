import OpenAI from 'openai'

const openai = new OpenAI({
  baseURL: "https://api.studio.nebius.ai/v1/",
  apiKey: process.env.NEBIUS_API_KEY,
})

export default openai

