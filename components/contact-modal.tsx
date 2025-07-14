"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  type: "featured" | "member" | "event" | "admin" | null
  buttonText?: string
  buttonVariant?: "default" | "outline" | "secondary" | "ghost" | "link"
  buttonSize?: "default" | "sm" | "lg" | "icon"
  className?: string
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
  })

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
          submitText: "Register for Events",
        }
      default:
        return {
          title: "Contact Us",
          description: "Get in touch with us.",
          submitText: "Submit",
        }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", { type, ...formData })
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
    })
  }

  const handleInterestChange = (interest: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      interests: checked ? [...prev.interests, interest] : prev.interests.filter((i) => i !== interest),
    }))
  }

  const content = getModalContent()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-white border-blue-100 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-blue-600 text-xl">{content.title}</DialogTitle>
          <DialogDescription className="text-blue-700">{content.description}</DialogDescription>
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
            <div className="space-y-2">
              <Label htmlFor="eventPreference" className="text-blue-800 font-medium">
                Which type of events interest you most?
              </Label>
              <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, eventPreference: value }))}>
                <SelectTrigger className="border-blue-300 focus:border-blue-500">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="networking">
                    Networking Meetups
                  </SelectItem>
                  <SelectItem value="creative">
                    Creative Sessions
                  </SelectItem>
                  <SelectItem value="industry">
                    Industry-Specific Events
                  </SelectItem>
                  <SelectItem value="sip-slurp">
                    Sip &amp; Slurp Gatherings
                  </SelectItem>
                  <SelectItem value="all">
                    All Events
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="message" className="text-blue-800 font-medium">
              Additional Message
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
              rows={3}
              placeholder="Tell us more about yourself or any specific questions you have..."
              className="border-blue-300 focus:border-blue-500"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white border-0"
            >
              {content.submitText}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
