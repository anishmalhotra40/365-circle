"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, ArrowUp } from "lucide-react";
import Navigation from "@/components/navigation";
import ContactModal from "@/components/contact-modal";
import Metrics from "@/components/metrics";
import AboutUsSection from "@/components/about";
import { WhoWeServe } from "@/components/whoweserve";
import Events from "@/components/events";
import Newsletter from "@/components/newsletter";
import FaqSection from "@/components/faq";
import Footer from "@/components/footer";
import BrandCarousel from "@/components/brand-carousel";
import Connections from "@/components/connections";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"featured" | "member" | "event" | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const openModal = (type: "featured" | "member" | "event") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-white text-blue-900 font-sans min-h-screen overflow-x-hidden">
      <Navigation />
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modalType}
      />

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <Image
          alt="Hero background"
          src="/heroimage.jpeg"
          fill
          className="absolute inset-0 object-cover object-center z-0"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80 z-10"></div>

        <div className="relative z-20 flex flex-col items-center justify-center w-full h-full px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex justify-center mt-4 sm:mt-6">
            <a
              href="https://www.transcurators.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 sm:px-4 md:px-6 py-2 rounded-full backdrop-blur-md bg-blue-600/10 border border-white/30 shadow-lg text-white font-semibold text-xs sm:text-sm flex items-center gap-1 max-w-fit"
              style={{
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-blue-500 mr-1 sm:mr-2 animate-pulse"></span>
              <span className="whitespace-nowrap">Powered by</span>
              <span className="font-bold whitespace-nowrap">TransCurators</span>
            </a>
          </div>

          <div className="w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto text-center">
            <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white tracking-tighter mb-4 sm:mb-6 leading-tight px-2">
              Impactful Stories. Infinite Connections. One Strategic Network.
            </h1>

            <div className="backdrop-blur-md bg-white/5 rounded-xl sm:rounded-2xl shadow-lg px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-6 mx-auto mb-6 sm:mb-8 max-w-full">
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90 leading-relaxed">
                A community-driven initiative that brings together CXOs,
                founders, business leaders, aspirants, and emerging
                changemakers—united by the power of storytelling and purposeful
                networking to build a legacy of connection and influence.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-3 w-full">
              <Button
                size="lg"
                className="group bg-blue-600 text-white hover:bg-blue-700 rounded-full px-6 sm:px-8 py-4 text-sm sm:text-base md:text-lg w-full sm:w-auto max-w-full sm:max-w-md md:max-w-lg transition-all duration-300"
                onClick={() => openModal("member")}
              >
                <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-center">
                  <span className="sm:inline hidden leading-tight text-center sm:text-left font-medium">
                    Get Featured with The 365 Circle
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="font-extrabold leading-tight text-center sm:text-left">
                      Join the Waitlist
                    </span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Button>
            </div>
          </div>
        </div>

        <a
          href="#about"
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 text-white animate-bounce"
        >
          <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8" />
          <span className="sr-only">Scroll down</span>
        </a>
      </section>

      {/* Metrics Section */}
      <Metrics />

      {/* About & Who We Serve */}
      <AboutUsSection />
      <WhoWeServe />

      {/* Other Sections */}
      <Events />
      <BrandCarousel />
      <Connections />
      <Newsletter />
      <FaqSection />
      <Footer />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
