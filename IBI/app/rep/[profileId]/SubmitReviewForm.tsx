'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface SubmitReviewFormProps {
  repId: string
}

export default function SubmitReviewForm({ repId }: SubmitReviewFormProps) {
  const [reviewerName, setReviewerName] = useState('')
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    const supabase = createClient()

    const { error } = await supabase.from('reviews').insert({
      rep_id: repId,
      reviewer_name: reviewerName,
      rating,
      comment,
      is_approved: false, // Requires admin approval
    })

    if (error) {
      setMessage({ type: 'error', text: 'Failed to submit review. Please try again.' })
    } else {
      setMessage({
        type: 'success',
        text: 'Review submitted successfully! It will be visible after approval.',
      })
      // Reset form
      setReviewerName('')
      setRating(5)
      setComment('')
    }

    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      {/* Reviewer Name */}
      <div>
        <label htmlFor="reviewer-name" className="label">
          Your Name *
        </label>
        <input
          type="text"
          id="reviewer-name"
          required
          value={reviewerName}
          onChange={(e) => setReviewerName(e.target.value)}
          className="input"
          placeholder="John Doe"
        />
      </div>

      {/* Rating */}
      <div>
        <label htmlFor="rating" className="label">
          Rating *
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="transition-transform hover:scale-110"
            >
              <svg
                className={`h-8 w-8 ${
                  star <= rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Comment */}
      <div>
        <label htmlFor="comment" className="label">
          Comment (Optional)
        </label>
        <textarea
          id="comment"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="input"
          placeholder="Share your experience..."
        />
      </div>

      {/* Message */}
      {message && (
        <div
          className={`rounded-lg p-4 ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800'
              : 'bg-red-50 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Submit Button */}
      <button type="submit" disabled={isSubmitting} className="btn btn-primary">
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  )
}
