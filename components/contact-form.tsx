"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import type React from "react"

function ContactFormInner() {
  const [showSuccess, setShowSuccess] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check if user was redirected back after successful submission
    if (searchParams.get('submitted') === 'true') {
      setShowSuccess(true)
      // Auto-hide after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000)
      
      // Clean up URL by removing the parameter
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href)
        url.searchParams.delete('submitted')
        window.history.replaceState({}, '', url.toString())
      }
    }
  }, [searchParams])

  return (
    <section id="contact" className="pt-0 pb-20 md:pb-28 bg-white dark:bg-blue-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 dark:text-blue-100 mb-6 md:mb-10">
          Contact Us
        </h2>
        <p className="text-center text-blue-800/70 dark:text-blue-400 mb-12 max-w-xl mx-auto text-base md:text-lg">
          Have a question or want to collaborate? Fill out the form and we&apos;ll get back to you shortly.
        </p>

        {/* Success Message */}
        {showSuccess && (
          <div className="max-w-2xl mx-auto mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Message sent successfully! We&apos;ll get back to you soon.</span>
              </div>
              <button 
                onClick={() => setShowSuccess(false)}
                className="text-green-700 hover:text-green-900"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <form 
          action="https://formsubmit.co/anasnasim1@gmail.com" 
          method="POST"
          className="max-w-2xl mx-auto bg-blue-50 dark:bg-blue-900/50 p-8 md:p-10 rounded-xl shadow-md dark:shadow-blue-900/30 space-y-8 transition-all"
        >
          {/* FormSubmit configuration fields */}
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_next" value={typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}?submitted=true#contact` : 'https://the365circle.in?submitted=true#contact'} />
          <input type="hidden" name="_subject" value="New Contact Form Submission - The 365 Circle" />
          <input type="hidden" name="_template" value="table" />
          
          <div className="space-y-2">
            <Label htmlFor="name" className="text-blue-800 dark:text-blue-200 font-medium">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Your Name"
              required
              className="border border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-blue-800 dark:text-blue-200 font-medium">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your.email@example.com"
              required
              className="border border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-blue-800 dark:text-blue-200 font-medium">
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="How can we help you?"
              rows={6}
              required
              className="border border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all rounded-lg"
            />
          </div>

          <div className="text-center">
            <Button
              type="submit"
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md rounded-lg px-8 py-3 transition-transform hover:scale-[1.02]"
            >
              Send Message
            </Button>
          </div>
          
        </form>
      </div>
    </section>
  )
}

export default function ContactForm(props: React.ComponentPropsWithoutRef<"section">) {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading contact form...</div>}>
      <ContactFormInner {...props} />
    </Suspense>
  );
}