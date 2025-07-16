"use client"

import Image from "next/image"
import Link from "next/link"
import { X as XIcon, Linkedin, Instagram } from "lucide-react"

export default function Footer() {
	return (
		<footer className="w-full py-10 bg-blue-50 dark:bg-blue-950 border-t border-blue-100 dark:border-blue-800">
			<div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
				
				{/* Logo and Branding */}
				<div className="flex items-center gap-3">
					<Image src="/logo.png" alt="365 Circle Logo" width={42} height={42} className="rounded-lg" />
					<span className="text-blue-900 dark:text-blue-100 font-bold text-xl">The 365 Circle</span>
				</div>

				{/* Navigation / Links */}
				<div className="flex items-center gap-6">
					<Link href="#" target="_blank" aria-label="X" className="text-blue-800 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
						<XIcon className="w-5 h-5" />
					</Link>
					<Link href="https://www.linkedin.com/company/the-365-circle/" target="_blank" aria-label="LinkedIn" className="text-blue-800 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
						<Linkedin className="w-5 h-5" />
					</Link>
					<Link href="#" target="_blank" aria-label="Instagram" className="text-blue-800 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
						<Instagram className="w-5 h-5" />
					</Link>
				</div>

				{/* Copyright */}
				<div className="text-blue-800/70 dark:text-blue-400 text-sm text-center md:text-right">
					<p>© {new Date().getFullYear()} The 365 Circle. All rights reserved.</p>
					<p className="text-xs mt-1 flex items-center justify-center md:justify-end gap-2">
						<span>Powered by</span>
						<a href="https://www.transcurators.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
							<Image src="/tclogo.svg" alt="TransCurators Logo" width={100} height={24} className="inline-block align-middle" />
						</a>
					</p>
				</div>
			</div>
		</footer>
	)
}
