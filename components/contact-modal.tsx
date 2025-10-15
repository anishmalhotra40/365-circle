"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Link2, Check } from "lucide-react"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  type: "featured" | "member" | "event" | "admin" | null
  buttonText?: string
  buttonVariant?: "default" | "outline" | "secondary" | "ghost" | "link"
  buttonSize?: "default" | "sm" | "lg" | "icon"
  className?: string
}

interface Event {
  id: number
  name: string
  description?: string
  date: string
  time?: string
  location: string
  status: string
  max_attendees?: number
  registration_required: boolean
}

export default function ContactModal({ 
  isOpen, 
  onClose, 
  type,
}: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: type === "admin" ? "" : undefined,
    phone: "",
    company: "",
    title: "",
    industry: "",
    message: "",
    experience: "",
    interests: [] as string[],
    eventPreference: "",
    selectedEventId: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [eventsLoading, setEventsLoading] = useState(false)
  const [urlCopied, setUrlCopied] = useState(false)

  const supabase = createClient()

  const fetchEvents = useCallback(async () => {
    try {
      setEventsLoading(true)
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('registration_required', true)
        .eq('status', 'upcoming')
        .gte('date', new Date().toISOString().split('T')[0]) // Only future events
        .order('date', { ascending: true })

      if (error) throw error
      setEvents(data || [])
    } catch (error) {
      console.error('Error fetching events:', error)
      setSubmitError('Failed to load events. Please try again.')
    } finally {
      setEventsLoading(false)
    }
  }, [supabase])

  // Fetch events when modal opens for event type
  useEffect(() => {
    if (isOpen && type === "event") {
      fetchEvents()
    }
  }, [isOpen, type, fetchEvents])

  const getModalContent = () => {
    switch (type) {
      case "featured":
        return {
          title: "Get Featured with 365 Circle",
          description:
            "Share your inspiring story with our community. Tell us about your journey and what makes you unique.",
          submitText: "Submit Application",
        }
      case "member":
        return {
          title: "Become a Member",
          description:
            "Join our exclusive community of inspiring professionals and gain access to networking events and opportunities.",
          submitText: "Join Community",
        }
      case "event":
        return {
          title: "Register for Events",
          description: "Register for our upcoming networking events and connect with like-minded professionals.",
          submitText: "Register for Event",
        }
      default:
        return {
          title: "Contact Us",
          description: "Get in touch with us.",
          submitText: "Submit",
        }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    
    try {
      if (type === "member") {
        // Check if email already exists
        const { data: existingMember, error: checkError } = await supabase
          .from('members')
          .select('id')
          .eq('email', formData.email)
          .single()

        if (checkError && checkError.code !== 'PGRST116') {
          // PGRST116 is "not found" error, which is expected for new members
          throw checkError
        }

        if (existingMember) {
          setSubmitError('A member with this email already exists.')
          return
        }

        // Insert new member
        const { error: insertError } = await supabase
          .from('members')
          .insert([{
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            company: formData.company || null,
            title: formData.title || null,
            industry: formData.industry || null,
            interests: formData.interests.length > 0 ? formData.interests : null
          }])

        if (insertError) {
          throw insertError
        }

        alert('Welcome to The 365 Circle! You have successfully joined the waitlist.')
      } else if (type === "featured") {
        // Check if email already exists for featured submissions
        const { data: existingFeatured, error: checkError } = await supabase
          .from('featured_submissions')
          .select('id')
          .eq('email', formData.email)
          .single()

        if (checkError && checkError.code !== 'PGRST116') {
          throw checkError
        }

        if (existingFeatured) {
          setSubmitError('You have already submitted a featured application with this email.')
          return
        }

        // Insert new featured submission
        const { error: insertError } = await supabase
          .from('featured_submissions')
          .insert([{
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            company: formData.company || null,
            title: formData.title || null,
            industry: formData.industry || null,
            experience: formData.experience
          }])

        if (insertError) {
          throw insertError
        }

        alert('Thank you for your featured application! We will review your submission and get back to you soon.')
      } else if (type === "event") {
        // Validate event selection
        if (!formData.selectedEventId) {
          setSubmitError('Please select an event to register for.')
          return
        }

        // Check if user is already registered for this event
        const { data: existingRegistration, error: checkError } = await supabase
          .from('event_registrations')
          .select('id')
          .eq('event_id', formData.selectedEventId)
          .eq('email', formData.email)
          .single()

        if (checkError && checkError.code !== 'PGRST116') {
          throw checkError
        }

        if (existingRegistration) {
          setSubmitError('You are already registered for this event.')
          return
        }

        // Get event details for confirmation
        const { data: eventData, error: eventError } = await supabase
          .from('events')
          .select('name, date, time, location, max_attendees')
          .eq('id', formData.selectedEventId)
          .single()

        if (eventError) throw eventError

        // Check if event is full
        if (eventData.max_attendees) {
          const { count, error: countError } = await supabase
            .from('event_registrations')
            .select('*', { count: 'exact', head: true })
            .eq('event_id', formData.selectedEventId)

          if (countError) throw countError

          if (count && count >= eventData.max_attendees) {
            setSubmitError('Sorry, this event is full. Please select another event.')
            return
          }
        }

        // Insert new event registration
        const { error: insertError } = await supabase
          .from('event_registrations')
          .insert([{
            event_id: formData.selectedEventId,
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            company: formData.company || null,
            title: formData.title || null,
            industry: formData.industry || null,
            event_preference: formData.eventPreference || null
          }])

        if (insertError) throw insertError

        alert(`Thank you for registering for "${eventData.name}"! 
Event Details:
Date: ${new Date(eventData.date).toLocaleDateString()}
Time: ${eventData.time || 'TBA'}
Location: ${eventData.location}

We will send you a confirmation email with more details.`)
      } else {
        // Handle other form types (event, etc.)
        console.log("Form submitted:", { type, ...formData })
        alert('Thank you for your submission! We will get back to you soon.')
      }

      onClose()
      // Reset form
      setFormData({
        name: "",
        email: "",
        password: type === "admin" ? "" : undefined,
        phone: "",
        company: "",
        title: "",
        industry: "",
        message: "",
        experience: "",
        interests: [],
        eventPreference: "",
        selectedEventId: "",
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitError(error instanceof Error ? error.message : 'An error occurred while submitting the form.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInterestChange = (interest: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      interests: checked ? [...prev.interests, interest] : prev.interests.filter((i) => i !== interest),
    }))
  }

  const handleCopyFormUrl = () => {
    if (!type) return
    
    const baseUrl = window.location.origin
    const formUrl = `${baseUrl}?form=${type}`
    
    navigator.clipboard.writeText(formUrl).then(() => {
      setUrlCopied(true)
      setTimeout(() => setUrlCopied(false), 2000)
    }).catch((err) => {
      console.error('Failed to copy URL:', err)
    })
  }

  const content = getModalContent()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto bg-white border-blue-100 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-blue-600 text-xl">{content.title}</DialogTitle>
          <DialogDescription className="text-blue-700">{content.description}</DialogDescription>
          <div className="pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCopyFormUrl}
              className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2"
              title="Copy form URL to share"
            >
              {urlCopied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span className="text-xs whitespace-nowrap">Copied!</span>
                </>
              ) : (
                <>
                  <Link2 className="w-4 h-4" />
                  <span className="text-xs whitespace-nowrap">Copy Form URL</span>
                </>
              )}
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-blue-800 font-medium">
                Full Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                required
                className="border-blue-300 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-800 font-medium">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                required
                className="border-blue-300 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-blue-800 font-medium">
                Phone Number
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                className="border-blue-300 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company" className="text-blue-800 font-medium">
                Company/Organization
              </Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                className="border-blue-300 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-blue-800 font-medium">
                Job Title
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                className="border-blue-300 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry" className="text-blue-800 font-medium">
                Industry
              </Label>
              <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, industry: value }))}>
                <SelectTrigger className="border-blue-300 focus:border-blue-500">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">
                    Technology
                  </SelectItem>
                  <SelectItem value="healthcare">
                    Healthcare
                  </SelectItem>
                  <SelectItem value="finance">
                    Finance
                  </SelectItem>
                  <SelectItem value="education">
                    Education
                  </SelectItem>
                  <SelectItem value="design">
                    Design
                  </SelectItem>
                  <SelectItem value="marketing">
                    Marketing
                  </SelectItem>
                  <SelectItem value="consulting">
                    Consulting
                  </SelectItem>
                  <SelectItem value="nonprofit">
                    Non-Profit
                  </SelectItem>
                  <SelectItem value="other">
                    Other
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {type === "featured" && (
            <div className="space-y-2">
              <Label htmlFor="experience" className="text-blue-800 font-medium">
                Tell us about your professional journey and what makes your story inspiring *
              </Label>
              <Textarea
                id="experience"
                value={formData.experience}
                onChange={(e) => setFormData((prev) => ({ ...prev, experience: e.target.value }))}
                rows={4}
                required
                className="border-blue-300 focus:border-blue-500"
              />
            </div>
          )}

          {type === "member" && (
            <div className="space-y-2">
              <Label className="text-base font-medium text-blue-800">
                What are you most interested in? (Select all that apply)
              </Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {[
                  "Networking Events",
                  "Professional Development",
                  "Industry Insights",
                  "Mentorship",
                  "Speaking Opportunities",
                  "Collaboration Projects",
                ].map((interest) => (
                  <div key={interest} className="flex items-center space-x-2">
                    <Checkbox
                      id={interest}
                      checked={formData.interests.includes(interest)}
                      onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                      className="border-blue-300 data-[state=checked]:bg-blue-600"
                    />
                    <Label htmlFor={interest} className="text-sm text-blue-800 font-normal">
                      {interest}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {type === "event" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="selectedEvent" className="text-blue-800 font-medium">
                  Select Event to Register For *
                </Label>
                {eventsLoading ? (
                  <div className="p-4 text-center text-blue-600">Loading events...</div>
                ) : events.length === 0 ? (
                  <div className="p-4 text-center text-gray-600">
                    No upcoming events with registration available at the moment.
                  </div>
                ) : (
                  <Select 
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, selectedEventId: value }))}
                    required
                  >
                    <SelectTrigger className="border-blue-300 focus:border-blue-500">
                      <SelectValue placeholder="Select an event" />
                    </SelectTrigger>
                    <SelectContent>
                      {events.map((event) => (
                        <SelectItem key={event.id} value={event.id.toString()}>
                          <div className="flex flex-col">
                            <span className="font-medium">{event.name}</span>
                            <span className="text-sm text-gray-500">
                              {new Date(event.date).toLocaleDateString()} • {event.location}
                              {event.max_attendees && ` • Max ${event.max_attendees} attendees`}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventPreference" className="text-blue-800 font-medium">
                  Which type of events interest you most?
                </Label>
                <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, eventPreference: value }))}>
                  <SelectTrigger className="border-blue-300 focus:border-blue-500">
                    <SelectValue placeholder="Select event type preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="networking">Networking Meetups</SelectItem>
                    <SelectItem value="creative">Creative Sessions</SelectItem>
                    <SelectItem value="industry">Industry-Specific Events</SelectItem>
                    <SelectItem value="sip-slurp">Sip &amp; Slurp Gatherings</SelectItem>
                    <SelectItem value="all">All Events</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {submitError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{submitError}</p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || (type === "event" && events.length === 0)}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white border-0 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : content.submitText}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
