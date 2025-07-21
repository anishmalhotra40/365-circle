"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("success");
    setMessage("You have successfully subscribed to our newsletter.");
    setEmail("");
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {}
  };

  return (
    <section id="newsletter" className="py-12 sm:py-20 md:py-32 bg-blue-50/50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-blue-700 mb-2">
            Join the 365 Circle Newsletter
          </h2>
          <p className="text-base sm:text-lg text-blue-800/80 mt-2 mb-8">
            Be the first to hear inspiring stories, get exclusive event invitations, and stay connected with our vibrant community.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border-blue-200 focus:ring-blue-500 rounded-full px-4 py-2 sm:px-5 sm:py-3 text-sm sm:text-base"
              required
              aria-label="Email address"
            />
            <Button
              type="submit"
              size="lg"
              className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200/60 hover:scale-105 rounded-full transition-all duration-300 text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3"
              disabled={status === "success"}
            >
              {status === "success" ? "Subscribed" : "Subscribe"}
            </Button>
          </form>

          <div className="mt-4 sm:mt-6 min-h-[40px]" aria-live="polite">
            {status === "success" && (
              <div className="flex items-center justify-center gap-2 bg-blue-100 border border-blue-300 text-blue-800 rounded-lg px-4 py-3 shadow-sm mx-auto max-w-md text-sm sm:text-base">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <span>You have successfully subscribed.</span>
              </div>
            )}
            {status === "error" && (
              <div className="flex items-center justify-center gap-2 bg-red-100 border border-red-300 text-red-800 rounded-lg px-4 py-3 shadow-sm mx-auto max-w-md text-sm sm:text-base">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                <span>{message}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
