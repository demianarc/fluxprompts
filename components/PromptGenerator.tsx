'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { generatePrompt, generateImage } from '@/lib/actions'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CopyButton } from '@/components/CopyButton'
import Image from 'next/image'
import { Copy } from 'lucide-react'

export default function PromptGenerator() {
  const [userInput, setUserInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{
    enhancedPrompt: string;
    negativePrompt: string;
    cfgScale: number;
    additionalTips: string;
  } | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const generatedResult = await generatePrompt(userInput)
      setResult(generatedResult)
      toast.success('Prompt generated successfully!')
    } catch (error) {
      toast.error('Failed to generate prompt. The AI response was invalid. Please try again.')
      console.error('Error generating prompt:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerateImage = async () => {
    if (!result?.enhancedPrompt || !result?.negativePrompt) {
      toast.error('Please generate a prompt first')
      return
    }

    setIsGeneratingImage(true)
    try {
      const url = await generateImage(result.enhancedPrompt, result.negativePrompt)
      if (url) {
        setImageUrl(url)
        toast.success('Image generated successfully!')
      } else {
        toast.error('Failed to generate image. Please try again.')
      }
    } catch (error) {
      toast.error('Failed to generate image. Please try again.')
      console.error('Error generating image:', error)
    } finally {
      setIsGeneratingImage(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Copied to clipboard!')
    } catch (err) {
      toast.error('Failed to copy text')
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Describe the image you want to generate..."
          className="w-full h-32"
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Optimized Prompt'
          )}
        </Button>
      </form>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Enhanced Prompt</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{result.enhancedPrompt}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(result.enhancedPrompt)}
                >
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy enhanced prompt</span>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Negative Prompt</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{result.negativePrompt}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(result.negativePrompt)}
                >
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy negative prompt</span>
                </Button>
              </CardContent>
            </Card>

            <Button
              onClick={handleGenerateImage}
              className="w-full"
              disabled={isGeneratingImage}
            >
              {isGeneratingImage ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Image...
                </>
              ) : (
                'Generate Image'
              )}
            </Button>

            {imageUrl && (
              <Card>
                <CardContent className="pt-6">
                  <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                    <Image
                      src={imageUrl}
                      alt="Generated image"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 768px"
                      priority
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

