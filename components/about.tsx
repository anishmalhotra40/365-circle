"use client"

import Image from "next/image"

export default function AboutUsSection() {
	return (
		<section id="about" className="pt-16 md:pt-24 pb-10 overflow-hidden bg-white">
			<div className="relative mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20 max-w-5xl">
				
				{/* Left: Text Content */}
				<div className="w-full md:w-1/2 text-center md:text-left">
					<h2 className="text-xs md:text-sm font-semibold text-blue-600 tracking-widest uppercase">
						Our Mission
					</h2>

					<h3 className="mt-3 text-2xl md:text-4xl font-extrabold text-blue-900 leading-tight">
						Connecting People, One Story at a Time
					</h3>

					<p className="mt-5 text-base md:text-lg text-blue-800/90 leading-relaxed">
						At <span className="font-semibold text-blue-700">365 Circle</span>, we aim to connect with <span className="font-semibold text-blue-700">365 people in 365 days</span>—sharing real stories that inspire, empower, and build lasting connections.
					</p>

					<p className="mt-4 text-base md:text-lg text-blue-800/80 leading-relaxed">
						Every story matters. We’re here to spotlight voices that encourage others to dream bigger and live with purpose.
					</p>

					<div className="mt-10 bg-blue-50/100 p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
						<blockquote className="text-center md:text-left text-lg md:text-xl font-medium text-blue-900 italic leading-relaxed">
							&ldquo;We believe every person has a story worth sharing. A story that can spark an idea, offer a new perspective, or change a life.&rdquo;
						</blockquote>
					</div>
				</div>

				{/* Right: Logo Image - Hidden on mobile */}
				<div className="hidden md:flex w-full md:w-1/2 justify-center md:justify-end mt-8 md:mt-0">
					<Image
						src="/logo.png"
						alt="365 Circle Logo"
						width={400}
						height={400}
						className="w-[300px] md:w-[400px] h-auto object-contain transition-transform duration-300 hover:scale-105"
						priority
					/>
				</div>
			</div>
		</section>
	)
}
