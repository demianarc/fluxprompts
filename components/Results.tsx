'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Copy } from 'lucide-react'
import { toast } from 'sonner'

export default function Results() {
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [enhancedPrompt, setEnhancedPrompt] = useState('')

  useEffect(() => {
    const updateResults = (event: CustomEvent) => {
      setGeneratedPrompt(event.detail.generatedPrompt)
      setEnhancedPrompt(event.detail.enhancedPrompt)
    }

    window.addEventListener('updateResults', updateResults as EventListener)

    return () => {
      window.removeEventListener('updateResults', updateResults as EventListener)
    }
  }, [])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Copied to clipboard!')
    } catch (err) {
      toast.error('Failed to copy text')
    }
  }

  if (!generatedPrompt && !enhancedPrompt) {
    return null
  }

  return (
    <div className="space-y-6 mt-8">
      <Card>
        <CardHeader>
          <CardTitle>Basic Generated Prompt</CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">{generatedPrompt}</p>
          {generatedPrompt && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => copyToClipboard(generatedPrompt)}
            >
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy basic prompt</span>
            </Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Enhanced Prompt (Llama 3.3)</CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">{enhancedPrompt}</p>
          {enhancedPrompt && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => copyToClipboard(enhancedPrompt)}
            >
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy enhanced prompt</span>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

