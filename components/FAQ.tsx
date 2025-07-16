"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

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
]

export default function FaqSection() {
	return (
		<section id="faq" className="py-20 md:py-20">
			<div className="container mx-auto px-4">
				<div className="max-w-3xl mx-auto text-center mb-12">
					<h2 className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-blue-200 mb-4">Frequently Asked Questions</h2>
					<p className="text-blue-800/80 dark:text-blue-300/80 text-lg">Got questions? We’ve got answers.</p>
				</div>

				<Accordion type="single" collapsible className="w-full space-y-4">
					{faqItems.map((item, index) => (
						<AccordionItem 
							key={index} 
							value={`item-${index}`} 
							className="rounded-xl border border-blue-100 dark:border-blue-800 shadow-sm overflow-hidden transition-all duration-300"
						>
							<AccordionTrigger className="text-lg md:text-xl font-semibold text-blue-900 dark:text-blue-100 px-4 py-3 hover:no-underline">
								{item.question}
							</AccordionTrigger>
							<AccordionContent className="text-base text-blue-800/80 dark:text-blue-300 px-4 pb-4">
								{item.answer}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	)
}
