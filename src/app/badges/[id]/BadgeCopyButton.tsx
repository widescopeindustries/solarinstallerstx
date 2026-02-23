'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function BadgeCopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <Button
      onClick={handleCopy}
      variant={copied ? 'default' : 'outline'}
      size="sm"
      className={copied ? 'bg-green-600 hover:bg-green-600 text-white' : ''}
    >
      {copied ? (
        <><Check className="h-3.5 w-3.5 mr-1.5" /> Copied!</>
      ) : (
        <><Copy className="h-3.5 w-3.5 mr-1.5" /> Copy Code</>
      )}
    </Button>
  )
}
