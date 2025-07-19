"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ChevronDown, Award, Users, Calendar } from "lucide-react";
import Navigation from "@/components/navigation";
import ContactModal from "@/components/contact-modal";
import ContactForm from "@/components/contact-form";
import FaqSection from "@/components/FAQ";
import Footer from "@/components/Footer";
import AboutUsSection from "@/components/about";
import BrandCarousel from "@/components/brand-carousel";
import Connections from "@/components/connections";
import Metrics from "@/components/metrics";
import { WhoWeServe } from "@/components/whoweserve";
import Events from "@/components/events";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<
    "featured" | "member" | "event" | null
  >(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("home");
      if (hero) {
        const rect = hero.getBoundingClientRect();
        setShowScrollTop(rect.bottom < 0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openModal = (type: "featured" | "member" | "event") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white text-blue-900 font-sans">
      <Navigation />
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modalType}
      />

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center text-center relative overflow-hidden"
      >
        <Image
          alt="Hero background"
          src="/heroimage.jpeg"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#000000]/10 to-[#000000] z-10"></div>
        <div className="container mx-auto px-4 z-20 animate-fade-in-up">
          {/* Glassmorphic, blinking capsule */}
          <div className="flex justify-center mb-6">
            <a
              href="https://www.transcurators.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 rounded-full backdrop-blur-md bg-blue-600/10 border border-white/30 shadow-lg text-white font-semibold text-sm flex items-center gap-1"
              style={{
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              <span className="w-3 h-3 rounded-full bg-blue-500 relative mr-2 animate-pulse-blue"></span>
              <span>Powered by</span>
              <span className="font-bold">TransCurators</span>
            </a>
          </div>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter mb-4">
              Capturing Stories, Creating Connections.
            </h1>
            <div className="flex justify-center">
              <div className="backdrop-blur-md bg-white/5 rounded-2xl shadow-lg px-6 py-4 max-w-2xl mx-auto mb-8">
                <p className="text-lg md:text-xl text-white">
                  A community-driven initiative dedicated to bringing together
                  individuals from diverse walks of life to share their unique
                  stories and build meaningful networks.
                </p>
              </div>
            </div>
            <Button
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700 rounded-full group"
              onClick={() => openModal("member")}
            >
             Get featured with The 365 Circle{" "}
             <span className="font-extrabold ml-1">Join the Waitlist</span>{" "}
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
        <a
          href="#about"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white animate-bounce"
        >
          <ChevronDown className="w-8 h-8" />
          <span className="sr-only">Scroll down</span>
        </a>
      </section>

      <Metrics />

      {/* Marquee Banner
			<div className="w-full">
				<TextHoverEffect />
			</div> */}

      {/* About Us Section */}
      <div>
        <AboutUsSection />
      </div>
      <div>
        <WhoWeServe />
      </div>

      {/* Call to Action Section */}
      {/* <section id="get-involved" className="py-20 md:py-32">
				<div className="container mx-auto px-4">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-extrabold tracking-tight text-blue-700">Join the Circle</h2>
						<p className="text-lg text-blue-800/80 mt-2 max-w-2xl mx-auto">
							There are many ways to be part of our growing community.
						</p>
					</div>
					<div className="grid md:grid-cols-3 gap-8 text-center">
						<div className="bg-white p-8 rounded-2xl border border-blue-100 shadow-sm hover:shadow-xl hover:shadow-blue-200/60 hover:scale-[1.03] transition-all duration-300 flex flex-col items-center">
							<Award className="w-12 h-12 text-blue-500 mb-4" />
							<h3 className="text-2xl font-bold text-blue-700 mb-2">Get Featured</h3>
							<p className="text-blue-800/80 mb-6 flex-grow">Share your story with our community and inspire others.</p>
							<Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:shadow-blue-200/60 hover:scale-105 rounded-full transition-all duration-300" onClick={() => openModal('featured')}>
								Apply Now
							</Button>
						</div>
						<div className="bg-white p-8 rounded-2xl border border-blue-100 shadow-sm hover:shadow-xl hover:shadow-blue-200/60 hover:scale-[1.03] transition-all duration-300 flex flex-col items-center">
							<Users className="w-12 h-12 text-blue-500 mb-4" />
							<h3 className="text-2xl font-bold text-blue-700 mb-2">Join the Waitlist</h3>
							<p className="text-blue-800/80 mb-6 flex-grow">Join our circle for exclusive access to events and networking.</p>
							<Button className="bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200/60 hover:scale-105 rounded-full transition-all duration-300" onClick={() => openModal('member')}>
								Join Today
							</Button>
						</div>
						<div className="bg-white p-8 rounded-2xl border border-blue-100 shadow-sm hover:shadow-xl hover:shadow-blue-200/60 hover:scale-[1.03] transition-all duration-300 flex flex-col items-center">
							<Calendar className="w-12 h-12 text-blue-500 mb-4" />
							<h3 className="text-2xl font-bold text-blue-700 mb-2">Exclusive Events</h3>
							<p className="text-blue-800/80 mb-6 flex-grow">Connect with innovators at our curated networking events.</p>
							<Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:shadow-blue-200/60 hover:scale-105 rounded-full transition-all duration-300" onClick={() => openModal('event')}>
								View Events
							</Button>
						</div>
					</div>
				</div>
			</section> */}
      <section
        id="get-involved"
        className="py-20 md:py-32 bg-gradient-to-b from-white"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-blue-700">
              Join the Circle
            </h2>
            <p className="text-lg md:text-xl text-blue-800/80 mt-4 max-w-2xl mx-auto">
              Become part of our vibrant community and unlock new opportunities.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10 text-center">
            {/* Get Featured */}
            <div className="bg-white p-10 rounded-3xl border border-blue-100 shadow-md hover:shadow-xl hover:shadow-blue-200/50 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center">
              <Award className="w-14 h-14 text-blue-500 mb-5" />
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">
                Get Featured
              </h3>
              <p className="text-blue-800/80 mb-8 flex-grow">
                Share your story with our community and inspire others.
              </p>
              <Button
                variant="outline"
                className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:shadow-blue-200/60 hover:scale-105 rounded-full px-6 py-2 transition-all duration-300"
                onClick={() => openModal("featured")}
              >
                join the waitlist
              </Button>
            </div>

            {/* Join the Waitlist */}
            <div className="bg-white p-10 rounded-3xl border border-blue-100 shadow-md hover:shadow-xl hover:shadow-blue-200/50 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center">
              <Users className="w-14 h-14 text-blue-500 mb-5" />
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">
                Become a Member
              </h3>
              <p className="text-blue-800/80 mb-8 flex-grow">
                Get exclusive access to upcoming events, perks, and networking.
              </p>
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200/60 hover:scale-105 rounded-full px-6 py-2 transition-all duration-300"
                onClick={() => openModal("member")}
              >
                join the waitlist
              </Button>
            </div>

            {/* Exclusive Events */}
            <div className="bg-white p-10 rounded-3xl border border-blue-100 shadow-md hover:shadow-xl hover:shadow-blue-200/50 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center">
              <Calendar className="w-14 h-14 text-blue-500 mb-5" />
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">
                Exclusive Events
              </h3>
              <p className="text-blue-800/80 mb-8 flex-grow">
                Connect with top innovators and attend curated networking
                events.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:shadow-blue-200/60 hover:scale-105 rounded-full px-6 py-2 transition-all duration-300"
                  onClick={() => {
                    const eventsSection = document.getElementById('events');
                    if (eventsSection) {
                      eventsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  View Events
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BrandCarousel />

      <Connections />

      <section id="events">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-blue-700">Events</h2>
          <p className="text-lg md:text-xl text-blue-800/80 mt-2">Past and Upcoming</p>
        </div>
        <Events />
        <div className="flex justify-center mt-8 mb-20">
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200/60 hover:scale-105 rounded-full px-8 py-3 text-lg transition-all duration-300"
            onClick={() => openModal("event")}
          >
            Register Now
          </Button>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="py-20 md:py-32 bg-blue-50/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-extrabold tracking-tight text-blue-700">
              Stay in the Loop
            </h2>
            <p className="text-lg text-blue-800/80 mt-2 mb-8">
              Subscribe to our newsletter for the latest stories, event
              invitations, and community news.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-grow bg-white border-blue-200 focus:ring-blue-500 rounded-full px-5 py-3"
              />
              <Button
                type="submit"
                size="lg"
                className="bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200/60 hover:scale-105 rounded-full transition-all duration-300"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection />

      <ContactForm />

      {/* Footer */}
      <Footer />
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          className="fixed bottom-24 right-6 z-50 bg-white/70 backdrop-blur-md border border-blue-200 shadow-lg rounded-full p-3 hover:bg-blue-600 hover:text-white transition-colors animate-fade-in-up"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
