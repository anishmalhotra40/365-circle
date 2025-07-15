"use client"

import Image from "next/image"
import Link from "next/link"
import { Twitter, Linkedin, Instagram } from "lucide-react"

export default function Footer() {
	return (
		<footer className="w-full py-10 bg-white dark:bg-blue-950 border-t border-blue-100 dark:border-blue-800">
			<div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
				
				{/* Logo and Branding */}
				<div className="flex items-center gap-3">
					<Image src="/logo.png" alt="365 Circle Logo" width={42} height={42} className="rounded-lg" />
					<span className="text-blue-900 dark:text-blue-100 font-bold text-xl">365 Circle</span>
				</div>

				{/* Navigation / Links */}
				<div className="flex items-center gap-6">
					<Link href="https://twitter.com/your-twitter" target="_blank" aria-label="Twitter" className="text-blue-800 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
						<Twitter className="w-5 h-5" />
					</Link>
					<Link href="https://linkedin.com/in/your-linkedin" target="_blank" aria-label="LinkedIn" className="text-blue-800 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
						<Linkedin className="w-5 h-5" />
					</Link>
					<Link href="https://instagram.com/your-instagram" target="_blank" aria-label="Instagram" className="text-blue-800 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
						<Instagram className="w-5 h-5" />
					</Link>
				</div>

				{/* Copyright */}
				<p className="text-blue-800/70 dark:text-blue-400 text-sm text-center md:text-right">
					© {new Date().getFullYear()} 365 Circle. All rights reserved.
				</p>
			</div>
		</footer>
	)
}
