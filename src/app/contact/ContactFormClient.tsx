'use client'

import { useState } from 'react'

export default function ContactFormClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Form handling logic here
    console.log('Form submitted:', formData)
    alert('Thank you! We will contact you soon.')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="bg-card p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Quick Contact Form</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium mb-2">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>
        <div>
          <label htmlFor="contact-city" className="block text-sm font-medium mb-2">
            City
          </label>
          <input
            id="contact-city"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>
        <div>
          <label htmlFor="contact-message" className="block text-sm font-medium mb-2">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground p-3 rounded-lg font-semibold hover:bg-primary/90"
        >
          Get Free Quote
        </button>
      </form>
    </div>
  )
}
