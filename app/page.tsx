"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight, ChevronDown, Award, Users, Calendar } from "lucide-react"
import Navigation from "@/components/navigation"
import ContactModal from "@/components/contact-modal"
import ContactForm from "@/components/contact-form"
import Logo from "@/components/logo"
import { TextHoverEffect } from "@/components/text-hover"
import Connections from "@/components/connections";

// FAQ data
const faqItems = [
	{
		question: "What is 365 Circle?",
		answer:
			"365 Circle is a community-driven initiative to connect with 365 people in 365 days, sharing their stories to inspire and build networks.",
	},
	{
		question: "How can I be featured?",
		answer:
			"You can apply to be featured by filling out our contact form. We are looking for unique stories that can empower and motivate others.",
	},
	{
		question: "What are the benefits of becoming a member?",
		answer:
			"Members get access to exclusive networking events, a supportive community, and opportunities to collaborate with professionals from various industries.",
	},
	{
		question: "Are the networking events virtual or in-person?",
		answer:
			"We host a mix of both virtual and in-person events to cater to our global community. Event details are shared with members in advance.",
	},
];

export default function HomePage() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalType, setModalType] = useState<"featured" | "member" | "event" | null>(null);

	const openModal = (type: "featured" | "member" | "event") => {
		setModalType(type);
		setIsModalOpen(true);
	};

	return (
		<div className="bg-white text-blue-900 font-sans">
			<Navigation />
			<ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} type={modalType} />

			{/* Hero Section */}
			<section id="home" className="min-h-screen flex items-center justify-center text-center relative overflow-hidden">
				<Image
					alt="Hero background"
					src="/heroimage.jpeg"
					layout="fill"
					objectFit="cover"
					className="z-0"
				/>
				<div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#000000]/10 to-[#000000] z-10"></div>
				<div className="container mx-auto px-4 z-20 animate-fade-in-up">
					<div className="max-w-4xl mx-auto">
						<h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter mb-4">
							Capturing Stories, Creating Connections.
						</h1>
						<p className="text-lg md:text-xl text-white max-w-2xl mx-auto mb-8">
							A community-driven initiative dedicated to bringing together individuals from diverse walks of life to share their unique stories and build meaningful networks.
						</p>
						<Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 rounded-full group" onClick={() => openModal('member')}>
							Become a Member <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
						</Button>
					</div>
				</div>
				<a href="#about" className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white animate-bounce">
					<ChevronDown className="w-8 h-8" />
					<span className="sr-only">Scroll down</span>
				</a>
			</section>

			{/* Marquee Banner */}
			<div className="w-full">
				<TextHoverEffect />
			</div>

			{/* About Us Section */}
			<section id="about" className="py-20 md:py-32">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto text-center">
						<h2 className="text-base font-semibold text-blue-600 tracking-wider uppercase">Our Mission</h2>
						<p className="mt-2 text-4xl md:text-5xl font-extrabold text-blue-900 tracking-tight">
							Connecting People, One Story at a Time
						</p>
						<p className="mt-6 max-w-2xl mx-auto text-lg text-blue-800/80">
							Our mission is simple yet powerful: connect with 365 incredible people in 365 days to share their unique stories, foster inspiration, and build meaningful networks. We highlight stories that empower, motivate, and encourage others to dream bigger.
						</p>
					</div>
					<div className="mt-16 max-w-4xl mx-auto">
						<div className="bg-blue-50/50 p-10 rounded-2xl shadow-sm">
							<blockquote className="text-center text-xl md:text-2xl font-medium text-blue-900 leading-relaxed">
								&ldquo;We believe every person has a story worth sharing. A story that can spark an idea, offer a new perspective, or change a life.&rdquo;
							</blockquote>
						</div>
					</div>
				</div>
			</section>

			{/* Connections Section */}
			<Connections />

			{/* Call to Action Section */}
			<section id="get-involved" className="py-20 md:py-32">
				<div className="container mx-auto px-4">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold tracking-tight text-blue-900">Join the Circle</h2>
						<p className="text-lg text-blue-800/80 mt-2 max-w-2xl mx-auto">
							There are many ways to be part of our growing community.
						</p>
					</div>
					<div className="grid md:grid-cols-3 gap-8 text-center">
						<div className="bg-white p-8 rounded-2xl border border-blue-100 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col items-center">
							<Award className="w-12 h-12 text-blue-500 mb-4" />
							<h3 className="text-2xl font-bold text-blue-900 mb-2">Get Featured</h3>
							<p className="text-blue-800/80 mb-6 flex-grow">Share your story with our community and inspire others.</p>
							<Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-full" onClick={() => openModal('featured')}>
								Apply Now
							</Button>
						</div>
						<div className="bg-white p-8 rounded-2xl border border-blue-100 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
							<Users className="w-12 h-12 text-blue-500 mb-4" />
							<h3 className="text-2xl font-bold text-blue-900 mb-2">Become a Member</h3>
							<p className="text-blue-800/80 mb-6 flex-grow">Join our circle for exclusive access to events and networking.</p>
							<Button className="bg-blue-600 text-white hover:bg-blue-700 rounded-full" onClick={() => openModal('member')}>
								Join Today
							</Button>
						</div>
						<div className="bg-white p-8 rounded-2xl border border-blue-100 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col items-center">
							<Calendar className="w-12 h-12 text-blue-500 mb-4" />
							<h3 className="text-2xl font-bold text-blue-900 mb-2">Exclusive Events</h3>
							<p className="text-blue-800/80 mb-6 flex-grow">Connect with innovators at our curated networking events.</p>
							<Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-full" onClick={() => openModal('event')}>
								View Events
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Newsletter Section */}
			<section id="newsletter" className="py-20 md:py-32 bg-blue-50/50">
				<div className="container mx-auto px-4">
					<div className="max-w-2xl mx-auto text-center">
						<h2 className="text-4xl font-bold tracking-tight text-blue-900">Stay in the Loop</h2>
						<p className="text-lg text-blue-800/80 mt-2 mb-8">
							Subscribe to our newsletter for the latest stories, event invitations, and community news.
						</p>
						<form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
							<Input type="email" placeholder="Enter your email" className="flex-grow bg-white border-blue-200 focus:ring-blue-500 rounded-full px-5 py-3" />
							<Button type="submit" size="lg" className="bg-blue-600 text-white hover:bg-blue-700 rounded-full">Subscribe</Button>
						</form>
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section id="faq" className="py-20 md:py-32">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto">
						<div className="text-center mb-12">
							<h2 className="text-4xl font-bold tracking-tight text-blue-900">Frequently Asked Questions</h2>
						</div>
						<Accordion type="single" collapsible className="w-full">
							{faqItems.map((item, index) => (
								<AccordionItem key={index} value={`item-${index}`} className="border-b-blue-100">
									<AccordionTrigger className="text-lg font-medium text-blue-900 hover:no-underline">
										{item.question}
									</AccordionTrigger>
									<AccordionContent className="text-base text-blue-800/80">
										{item.answer}
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</div>
				</div>
			</section>

			<ContactForm />

			{/* Footer */}
			<footer id="footer" className="py-12 bg-blue-900 text-white">
				<div className="container mx-auto px-4 text-center">
					<div className="flex justify-center items-center mb-4">
						<Logo size="small" light />
						<span className="ml-3 text-2xl font-bold">365 Circle</span>
					</div>
					<p className="mb-4">Capturing Stories, Creating Connections, Inspiring Lives.</p>
					<div className="flex justify-center gap-6 mb-6">
						<a href="#" className="hover:text-blue-300">LinkedIn</a>
						<a href="#" className="hover:text-blue-300">Twitter</a>
						<a href="#" className="hover:text-blue-300">Instagram</a>
					</div>
					<p className="text-sm text-blue-200">Powered by TransCurators</p>
					<p className="text-xs text-blue-300 mt-2">&copy; {new Date().getFullYear()} 365 Circle. All Rights Reserved.</p>
				</div>
			</footer>
		</div>
	);
}
