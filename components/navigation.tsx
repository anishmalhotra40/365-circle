"use client"

import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ChevronDown, Users, Star, UserPlus, CalendarDays } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/dropdown-menu"

const navItems = [
	{ name: "Home", href: "#home" },
	{ name: "About Us", href: "#about" },
	{
		name: "Get Involved",
		href: "#get-involved",
		dropdown: [
			{ name: "365 Connections", href: "/365-connections", icon: Users },
			{ name: "Get Featured", href: "#get-involved", icon: Star },
			{ name: "Join the Waitlist", href: "#get-involved", icon: UserPlus },
			{ name: "Exclusive Events", href: "#get-involved", icon: CalendarDays },
		],
	},
	{ name: "Contact Us", href: "#contact" },
]

export default function Navigation() {
	const [isOpen, setIsOpen] = useState(false)
	const [activeSection, setActiveSection] = useState("home")
	const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null)
	const [isInHero, setIsInHero] = useState(true)

	const router = useRouter()

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

			const heroElement = document.getElementById("home")
			if (heroElement) {
				const heroBottom = heroElement.offsetTop + heroElement.offsetHeight
				setIsInHero(scrollPosition < heroBottom)
			}
		}

		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	const handleNavigation = (href: string) => {
		if (href.startsWith("/")) {
			router.push(href)
			return
		}
		const element = document.querySelector(href)
		if (element) {
			element.scrollIntoView({ behavior: "smooth" })
		}
		setIsOpen(false)
	}

	return (
		<nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] md:w-auto z-50 transition-all duration-500">
			<div
				className={`rounded-full shadow-lg px-4 py-3 md:px-8 transition-all duration-500 ${
					isInHero ? "bg-white/10 backdrop-blur-md" : "bg-blue-100 backdrop-blur-md"
				}`}
			>
				<div className="flex justify-between items-center">
					<Image src="/logo.png" alt="The 365 Circle Logo" width={500} height={400} className="h-10 w-auto drop-shadow-lg" />

					<DesktopNav activeSection={activeSection} isInHero={isInHero} handleNavigation={handleNavigation} />

					<MobileNav
						isOpen={isOpen}
						setIsOpen={setIsOpen}
						openMobileDropdown={openMobileDropdown}
						setOpenMobileDropdown={setOpenMobileDropdown}
						handleNavigation={handleNavigation}
						isInHero={isInHero}
					/>
				</div>
			</div>
		</nav>
	)
}

function DesktopNav({ activeSection, isInHero, handleNavigation }: { activeSection: string; isInHero: boolean; handleNavigation: (href: string) => void }) {
	return (
		<div className="hidden md:flex items-center gap-1 md:gap-8 ml-12">
			{navItems.map((item) =>
				item.dropdown ? (
					<DropdownMenu key={item.name}>
						<DropdownMenuTrigger asChild>
							<button
								className={`px-3 py-2 text-sm font-medium transition-all duration-300 rounded-full flex items-center cursor-pointer ${
									isInHero ? "text-white hover:bg-white/20" : "text-blue-700 hover:bg-blue-100"
								} ${
									activeSection === item.href.substring(1) ||
									item.dropdown.some((d) => activeSection === d.href.substring(1))
										? isInHero
											? "bg-white/30 text-white shadow-md"
											: "bg-blue-500 text-white shadow-md"
										: ""
								}`}
							>
								{item.name}
								<ChevronDown className="w-4 h-4 ml-1" />
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className={`backdrop-blur-md rounded-xl shadow-lg border w-56 mt-2 ${
								isInHero ? "bg-white/20 text-white border-white/30" : "bg-white/90 text-blue-700 border-blue-100"
							}`}
						>
							{item.dropdown.map((dropdownItem) => (
								<DropdownMenuItem
									key={dropdownItem.name}
									onClick={() => handleNavigation(dropdownItem.href)}
									className={`flex items-center gap-3 p-2 transition-colors cursor-pointer ${
										isInHero ? "hover:bg-white/30" : "hover:bg-blue-100"
									}`}
								>
									<dropdownItem.icon className={`w-4 h-4 ${isInHero ? "text-white" : "text-blue-500"}`} />
									<span>{dropdownItem.name}</span>
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				) : (
					<button
						key={item.name}
						onClick={() => handleNavigation(item.href)}
						className={`px-3 py-2 text-sm font-medium transition-all duration-300 rounded-full flex items-center cursor-pointer ${
							isInHero ? "text-white hover:bg-white/20" : "text-blue-700 hover:bg-blue-100"
						} ${activeSection === item.href.substring(1)
							? isInHero
								? "bg-white/30 text-white shadow-md"
								: "bg-blue-500 text-white shadow-md"
							: ""}`}
					>
						{item.name}
					</button>
				)
			)}
		</div>
	)
}

function MobileNav({
	isOpen,
	setIsOpen,
	openMobileDropdown,
	setOpenMobileDropdown,
	handleNavigation,
	isInHero,
}: {
	isOpen: boolean
	setIsOpen: (open: boolean) => void
	openMobileDropdown: string | null
	setOpenMobileDropdown: (name: string | null) => void
	handleNavigation: (href: string) => void
	isInHero: boolean
}) {
	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild>
				<button
					className={`md:hidden p-0 m-0 bg-transparent border-0 outline-none transition-colors duration-300 cursor-pointer ${
						isInHero ? "text-white" : "text-blue-700"
					}`}
				>
					<Menu className="h-6 w-6" />
				</button>
			</SheetTrigger>
			<SheetContent
				side="top"
				className={`p-6 pt-10 flex flex-col space-y-4 items-center justify-start rounded-b-2xl shadow-xl transition-all duration-300 border-0 ${
					isInHero ? "bg-white/10 backdrop-blur-md text-white" : "bg-blue-100 text-blue-700"
				}`}
			>
				{navItems.map((item) =>
					item.dropdown ? (
						<div key={item.name} className="w-full">
							<button
								onClick={() => setOpenMobileDropdown(openMobileDropdown === item.name ? null : item.name)}
								className="flex justify-between items-center w-full text-left text-base font-medium cursor-pointer"
							>
								<span>{item.name}</span>
								<ChevronDown className={`w-5 h-5 transition-transform ${openMobileDropdown === item.name ? "rotate-180" : ""}`} />
							</button>
							{openMobileDropdown === item.name && (
								<div className="mt-2 pl-4 space-y-2">
									{item.dropdown.map((dItem) => (
										<button
											key={dItem.name}
											onClick={() => handleNavigation(dItem.href)}
											className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 cursor-pointer"
										>
											<dItem.icon className="w-4 h-4" />
											{dItem.name}
										</button>
									))}
								</div>
							)}
						</div>
					) : (
						<button
							key={item.name}
							onClick={() => handleNavigation(item.href)}
							className="text-left text-base font-medium w-full cursor-pointer"
						>
							{item.name}
						</button>
					)
				)}
			</SheetContent>
		</Sheet>
	)
}
