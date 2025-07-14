import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactForm() {
  return (
    <section id="contact" className="pt-0 pb-16 md:pb-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
          Contact Us
        </h2>
        <form className="max-w-2xl mx-auto space-y-8">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-blue-800 font-medium">Name</Label>
            <Input id="name" placeholder="Your Name" className="border-blue-300 focus:border-blue-500" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-blue-800 font-medium">Email</Label>
            <Input id="email" type="email" placeholder="your.email@example.com" className="border-blue-300 focus:border-blue-500" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="text-blue-800 font-medium">Message</Label>
            <Textarea id="message" placeholder="How can we help you?" rows={6} className="border-blue-300 focus:border-blue-500" />
          </div>
          <div className="text-center">
            <Button type="submit" size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg">
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
