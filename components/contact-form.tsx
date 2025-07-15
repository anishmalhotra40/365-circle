import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactForm() {
  return (
    <section id="contact" className="pt-0 pb-20 md:pb-28 bg-white dark:bg-blue-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 dark:text-blue-100 mb-6 md:mb-10">
          Contact Us
        </h2>
        <p className="text-center text-blue-800/70 dark:text-blue-400 mb-12 max-w-xl mx-auto text-base md:text-lg">
          Have a question or want to collaborate? Fill out the form and we’ll get back to you shortly.
        </p>

        <form className="max-w-2xl mx-auto bg-blue-50 dark:bg-blue-900/50 p-8 md:p-10 rounded-xl shadow-md dark:shadow-blue-900/30 space-y-8 transition-all">
          
          <div className="space-y-2">
            <Label htmlFor="name" className="text-blue-800 dark:text-blue-200 font-medium">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Your Name"
              className="border border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-blue-800 dark:text-blue-200 font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              className="border border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-blue-800 dark:text-blue-200 font-medium">
              Message
            </Label>
            <Textarea
              id="message"
              placeholder="How can we help you?"
              rows={6}
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
