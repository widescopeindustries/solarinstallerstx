import { ReactNode } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, BookOpen } from 'lucide-react'

export default function LearnLayout({ children }: { children: ReactNode }) {
  return (
    <div className="learn-section">
      <div className="container mx-auto px-4 py-4">
        <Button asChild variant="ghost" size="sm">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Home
          </Link>
        </Button>
      </div>
      {children}
    </div>
  )
}
