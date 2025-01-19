import PromptGenerator from '@/components/PromptGenerator'
import { ModeToggle } from '@/components/mode-toggle'
import { cn } from '@/lib/utils'

export default function Home() {
  return (
    <main className={cn(
      "min-h-screen bg-background flex flex-col items-center justify-center p-4",
      "transition-colors duration-300 ease-in-out"
    )}>
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <div className="w-full max-w-2xl mx-auto space-y-8">
        <h1 className={cn(
          "text-4xl font-bold text-center",
          "bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent"
        )}>
          FLUX Prompt Generator
        </h1>
        <p className="text-center text-muted-foreground">
          100X your image generation with FLUX with smart prompting
        </p>
        <PromptGenerator />
      </div>
    </main>
  )
}

