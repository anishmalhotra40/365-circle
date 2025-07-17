"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { Users } from "lucide-react"; // Icon for heading

const brands = [
  { src: "https://res.cloudinary.com/dxhmdb3i7/image/upload/v1752660589/SAR-Logo-new-2018g-2-removebg-preview_p3peat.png", alt: "SAR Group & SAR Electric Mobility" },
  { src: "https://res.cloudinary.com/dxhmdb3i7/image/upload/v1752660589/PwC_2025_Logo.svg-removebg-preview_hkf6g9.png", alt: "PWC" },
  { src: "https://res.cloudinary.com/dxhmdb3i7/image/upload/v1752660589/khaitan__co__logo-removebg-preview_mjidax.png", alt: "Khaitan & Company" },
  { src: "https://res.cloudinary.com/dxhmdb3i7/image/upload/v1752660587/1738102759141-removebg-preview_re8x0k.png", alt: "Accenture Strategy" },
  { src: "https://res.cloudinary.com/dxhmdb3i7/image/upload/v1752660589/techcurators_logo-removebg-preview_ml0xyy.png", alt: "Tech Curators" },
  { src: "https://res.cloudinary.com/dxhmdb3i7/image/upload/v1752660588/ICICI-BANK-LOGO-removebg-preview_zkac1j.png", alt: "ICICI Bank" },
  { src: "https://res.cloudinary.com/dxhmdb3i7/image/upload/v1752660587/amazon-official-logo-7017516947919651epoyhkqor-removebg-preview_xus7cx.png", alt: "Amazon" },
  { src: "https://res.cloudinary.com/dxhmdb3i7/image/upload/v1752660588/Deloitte_Logo-removebg-preview_dfwycz.png", alt: "Deloitte" },
  { src: "https://res.cloudinary.com/dxhmdb3i7/image/upload/v1752663439/Screenshot_2025-07-16_at_4.20.01_PM-removebg-preview_pueusj.png", alt: "EY" },
  { src: "https://res.cloudinary.com/dxhmdb3i7/image/upload/v1752660588/header-inset-grant-thornton-removebg-preview_vvbsgs.png", alt: "Grant Thornton" },
  { src: "https://res.cloudinary.com/dxhmdb3i7/image/upload/v1752660587/images-2-removebg-preview_qstrhn.png", alt: "United Breweries" },
  { src: "https://res.cloudinary.com/dxhmdb3i7/image/upload/v1752660588/images-removebg-preview-2_y7fmji.png", alt: "Bain & Company" },
  { src: "https://res.cloudinary.com/dxhmdb3i7/image/upload/v1752663439/Screenshot_2025-07-16_at_4.20.52_PM-removebg-preview_kib5eo.png", alt: "Hero MotoCorp" },
  { src: "https://res.cloudinary.com/dxhmdb3i7/image/upload/v1752660589/LG-Logo-1-removebg-preview_w1cake.png", alt: "LG Electronics" },
  { src: "https://res.cloudinary.com/dxhmdb3i7/image/upload/v1752663438/Screenshot_2025-07-16_at_4.21.26_PM-removebg-preview_idg8ke.png", alt: "Livguard" }
];

const BrandCarousel: React.FC = () => {
  const doubledBrands = [...brands, ...brands];

  return (
    <div className="w-full relative py-4 md:py-8 mb-8 md:mb-16 flex flex-col items-center justify-center overflow-hidden">
      {/* Watermark Logo */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 flex items-center justify-center z-0"
        style={{
          opacity: 0.07,
          background: 'none',
          top: '0',
          left: 0,
          right: 0,
          bottom: 0,
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <Image
          src="/logo.png"
          alt="365 Circle Logo Watermark"
          width={200}
          height={200}
          className="w-[200px] h-[200px] md:w-[200px] md:h-[200px] object-contain mt-[-4px] md:mt-[-4px]"
          priority
        />
      </div>

      {/* Heading Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10 relative z-10"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Users className="w-5 h-5 text-[#2C3E50]" />
          <span className="text-sm font-medium text-[#2C3E50]">
            Our <span className="text-blue-500">Trusted Network</span>
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 leading-tight">
          Working With Founders & Corporates <br /> From Leading Organizations & Institutions
        </h2>
        <p className="mt-4 text-sm md:text-base text-blue-500 max-w-xl mx-auto">
          Gain insights, mentorship, and career opportunities from professionals at top companies worldwide.
        </p>
      </motion.div>

      {/* Carousel with blue background */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[1800px] overflow-hidden relative z-10"
      >
        <div className="bg-blue-50 py-2 md:py-4 rounded-xl">
          <div className="flex items-center min-w-max animate-marquee whitespace-nowrap">
            {doubledBrands.map((brand, index) => (
              <div
                key={index}
                className="flex items-center justify-center px-1 md:px-2 min-w-[100px] sm:min-w-[140px] md:min-w-[180px] lg:min-w-[180px] h-[60px] sm:h-[80px] md:h-[100px] lg:h-[100px]"
              >
                <div className="flex items-center justify-center w-[100px] h-[60px] sm:w-[140px] sm:h-[80px] md:w-[180px] md:h-[100px] lg:w-[180px] lg:h-[100px]">
                  <Image
                    src={brand.src}
                    alt={brand.alt}
                    width={180}
                    height={100}
                    className="object-contain w-full h-full"
                    priority
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 35s linear infinite;
        }

        @media (max-width: 1024px) {
          .animate-marquee {
            animation-duration: 35s;
          }
        }

        @media (max-width: 768px) {
          .animate-marquee {
            animation-duration: 50s;
          }
        }

        @media (max-width: 480px) {
          .animate-marquee {
            animation-duration: 65s;
          }
        }
      `}</style>
    </div>
  );
};

export default BrandCarousel;
