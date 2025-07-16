"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import Image from "next/image"

export default function LoginPage() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState<string | null>(null)
	const [resetSent, setResetSent] = useState(false)
	const [isResettingPassword, setIsResettingPassword] = useState(false)
	const router = useRouter()
	const supabase = createClient()

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setError(null)
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		})

		if (error) {
			setError(error.message)
		} else {
			router.push("/admin")
			router.refresh()
		}
	}

	const handleForgotPassword = async () => {
		if (!email) {
			setError("Please enter your email address first")
			return
		}

		setIsResettingPassword(true)
		setError(null)

		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${window.location.origin}/reset-password`,
		})

		setIsResettingPassword(false)

		if (error) {
			setError(error.message)
		} else {
			setResetSent(true)
		}
	}

	return (
		<div
			className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
			style={{ backgroundImage: "url('/heroimage.jpg')" }}
		>
			<Card className="w-full max-w-md bg-blue-400/5 backdrop-blur-sm shadow-lg border-gray-200">
				<CardHeader className="text-center">
					<div className="mx-auto mb-4">
						<Image src="/logo.png" alt="The 365 Circle Logo" width={80} height={80} className="h-20 w-auto" />
					</div>
					<CardTitle className="text-2xl text-white">Admin Portal Login</CardTitle>
					<CardDescription className="text-white/80">Please sign in to continue</CardDescription>
				</CardHeader>
				<CardContent>
					{resetSent ? (
						<div className="text-center space-y-4">
							<div className="text-white bg-green-500/50 rounded-md p-4">
								<p className="font-medium">Password reset email sent!</p>
								<p className="text-sm mt-2">Check your email for a link to reset your password.</p>
							</div>
							<Button
								onClick={() => setResetSent(false)}
								variant="outline"
								className="w-full border-white/20 text-white hover:bg-white/10"
							>
								Back to Login
							</Button>
						</div>
					) : (
						<form onSubmit={handleLogin} className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="email" className="text-white">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="bg-white/10 text-white placeholder:text-white/60 border-white/20"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="password" className="text-white">Password</Label>
								<Input
									id="password"
									type="password"
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="bg-white/10 text-white border-white/20"
								/>
							</div>
							{error && (
								<p className="text-sm text-white bg-red-500/50 rounded-md p-2 text-center">
									{error}
								</p>
							)}
							<Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
								Sign In
							</Button>
							<div className="text-center">
								<Button
									type="button"
									variant="link"
									onClick={handleForgotPassword}
									disabled={isResettingPassword}
									className="text-white/80 hover:text-white underline p-0"
								>
									{isResettingPassword ? "Sending..." : "Forgot Password?"}
								</Button>
							</div>
						</form>
					)}
				</CardContent>
			</Card>
		</div>
	)
}