'use client'

import { useState } from 'react'
import { generatePrompt } from '../lib/actions'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'

export default function PromptForm() {
  const [inputPrompt, setInputPrompt] = useState('')
  const [subject, setSubject] = useState('')
  const [gender, setGender] = useState('female')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await generatePrompt(inputPrompt, subject, gender)
      toast.success('Prompt generated successfully!')
    } catch (error) {
      toast.error('Failed to generate prompt. Please try again.')
      console.error('Error generating prompt:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="inputPrompt">Custom Input Prompt (optional)</Label>
        <Input
          type="text"
          id="inputPrompt"
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          placeholder="Enter your base prompt..."
          className="w-full"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="subject">Subject (optional)</Label>
        <Input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter the subject..."
          className="w-full"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="gender">Gender</Label>
        <Select value={gender} onValueChange={setGender}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="male">Male</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          'Generate Prompt'
        )}
      </Button>
    </form>
  )
}

