"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ChevronDown, Users, Star, UserPlus, CalendarDays } from "lucide-react"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/dropdown-menu"

const navItems = [
	{ name: "Home", href: "#home" },
	{ name: "About Us", href: "#about" },
	{
		name: "Get Involved",
		href: "#get-involved",
		dropdown: [
			{ name: "365 Connections", href: "#connections", icon: Users },
			{ name: "Get Featured", href: "#get-involved", icon: Star },
			{ name: "Become a Member", href: "#get-involved", icon: UserPlus },
			{ name: "Exclusive Events", href: "#get-involved", icon: CalendarDays },
		],
	},
	{ name: "Contact Us", href: "#contact" },
]

export default function Navigation() {
	const [isOpen, setIsOpen] = useState(false)
	const [activeSection, setActiveSection] = useState("home")
	const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null)

	useEffect(() => {
		const handleScroll = () => {
			const sections = navItems.flatMap((item) =>
				item.dropdown ? item.dropdown.map((d) => d.href.substring(1)) : [item.href.substring(1)]
			)
			const scrollPosition = window.scrollY + 100

			for (const section of sections) {
				const element = document.getElementById(section)
				if (element) {
					const offsetTop = element.offsetTop
					const offsetHeight = element.offsetHeight

					if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
						setActiveSection(section)
						break
					}
				}
			}
		}

		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	const scrollToSection = (href: string) => {
		const element = document.querySelector(href)
		if (element) {
			element.scrollIntoView({ behavior: "smooth" })
		}
		setIsOpen(false)
	}

	return (
		<nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] md:w-auto z-50">
			<div className="bg-[#78c8e2]/10 backdrop-blur-md rounded-full shadow-lg px-4 py-3 md:px-8 animate-float">
				<div className="flex justify-between items-center">
					{/* Logo */}
					<div className="flex items-center gap-2">
						<Image src="/logos-05.png" alt="The 365 Circle Logo" width={500} height={400} className="h-10 w-auto" />
					</div>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center gap-1 md:gap-8 ml-12">
						{navItems.map((item) =>
							item.dropdown ? (
								<DropdownMenu key={item.name}>
									<DropdownMenuTrigger asChild>
										<button
											className={`px-3 py-2 text-sm font-medium transition-all duration-300 rounded-full flex items-center ${
												activeSection === item.href.substring(1) ||
												item.dropdown.some((d) => activeSection === d.href.substring(1))
													? "bg-blue-500 text-white shadow-md"
													: "text-blue-700 hover:bg-blue-50"
											}`}
										>
											{item.name}
											<ChevronDown className="w-4 h-4 ml-1" />
										</button>
									</DropdownMenuTrigger>
									<DropdownMenuContent className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-blue-100 w-56 mt-2">
										{item.dropdown.map((dropdownItem) => (
											<DropdownMenuItem
												key={dropdownItem.name}
												onClick={() => scrollToSection(dropdownItem.href)}
												className="flex items-center gap-3 p-2 text-blue-700 hover:!bg-blue-50 focus:!bg-blue-50 hover:!text-blue-800 focus:!text-blue-800 transition-colors cursor-pointer"
											>
												{dropdownItem.icon && <dropdownItem.icon className="w-4 h-4 text-blue-500" />}
												<span>{dropdownItem.name}</span>
											</DropdownMenuItem>
										))}
									</DropdownMenuContent>
								</DropdownMenu>
							) : (
								<button
									key={item.name}
									onClick={() => scrollToSection(item.href)}
									className={`px-3 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
										activeSection === item.href.substring(1)
											? "bg-blue-500 text-white shadow-md"
											: "text-blue-700 hover:bg-blue-50"
									}`}
								>
									{item.name}
								</button>
							)
						)}
					</div>

					{/* Mobile Navigation */}
					<Sheet open={isOpen} onOpenChange={setIsOpen}>
						<SheetTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								className="md:hidden text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full"
							>
								<Menu className="h-5 w-5" />
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white border-blue-100">
							<div className="flex flex-col space-y-4 mt-8">
								{navItems.map((item) =>
									item.dropdown ? (
										<div key={item.name}>
											<button
												onClick={() => setOpenMobileDropdown(openMobileDropdown === item.name ? null : item.name)}
												className={`flex justify-between items-center text-left text-lg font-medium transition-all duration-300 py-2 w-full ${
													activeSection === item.href.substring(1) ||
													item.dropdown.some((d) => activeSection === d.href.substring(1))
														? "text-blue-600 border-l-4 border-blue-500 pl-4 font-semibold"
														: "text-blue-800 hover:text-blue-600 pl-5"
												}`}
											>
												<span>{item.name}</span>
												<ChevronDown
													className={`w-5 h-5 mr-4 transition-transform duration-300 ${
														openMobileDropdown === item.name ? "rotate-180" : ""
													}`}
												/>
											</button>
											{openMobileDropdown === item.name && (
												<div className="flex flex-col pl-8 space-y-2 mt-2">
													{item.dropdown.map((dItem) => (
														<button
															key={dItem.name}
															onClick={() => scrollToSection(dItem.href)}
															className={`flex items-center gap-3 text-left text-base font-medium transition-all duration-300 py-1 ${
																activeSection === dItem.href.substring(1)
																	? "text-blue-600 font-semibold"
																	: "text-blue-700 hover:text-blue-600"
															}`}
														>
															{dItem.icon && <dItem.icon className="w-4 h-4 text-blue-500" />}
															<span>{dItem.name}</span>
														</button>
													))}
												</div>
											)}
										</div>
									) : (
										<button
											key={item.name}
											onClick={() => scrollToSection(item.href)}
											className={`text-left text-lg font-medium transition-all duration-300 py-2 ${
												activeSection === item.href.substring(1)
													? "text-blue-600 border-l-4 border-blue-500 pl-4 font-semibold"
													: "text-blue-800 hover:text-blue-600 pl-5"
											}`}
										>
											{item.name}
										</button>
									)
								)}
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</nav>
	)
}