"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import Image from "next/image"

export default function ResetPasswordPage() {
	const [newPassword, setNewPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [isValidSession, setIsValidSession] = useState(false)
	const router = useRouter()
	const supabase = createClient()

	useEffect(() => {
		// Check if we have a valid session for password reset
		const checkSession = async () => {
			const { data: { session } } = await supabase.auth.getSession()
			if (session) {
				setIsValidSession(true)
			} else {
				// Try to get session from URL hash (for password reset links)
				const hashParams = new URLSearchParams(window.location.hash.substring(1))
				const accessToken = hashParams.get('access_token')
				const refreshToken = hashParams.get('refresh_token')
				
				if (accessToken && refreshToken) {
					const { error } = await supabase.auth.setSession({
						access_token: accessToken,
						refresh_token: refreshToken
					})
					
					if (!error) {
						setIsValidSession(true)
					} else {
						setError("Invalid or expired reset link. Please request a new password reset.")
					}
				} else {
					setError("Invalid reset link. Please request a new password reset.")
				}
			}
		}

		checkSession()
	}, [supabase])

	const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setError(null)

		// Validate passwords
		if (newPassword.length < 6) {
			setError("Password must be at least 6 characters long")
			return
		}

		if (newPassword !== confirmPassword) {
			setError("Passwords do not match")
			return
		}

		setIsLoading(true)

		const { error } = await supabase.auth.updateUser({
			password: newPassword
		})

		setIsLoading(false)

		if (error) {
			setError(error.message)
		} else {
			setSuccess(true)
			// Redirect to login after 3 seconds
			setTimeout(() => {
				router.push("/login")
			}, 3000)
		}
	}

	const handleBackToLogin = () => {
		router.push("/login")
	}

	if (!isValidSession && !error) {
		return (
			<div
				className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
				style={{ backgroundImage: "url('/heroimage.jpg')" }}
			>
				<Card className="w-full max-w-md bg-blue-400/5 backdrop-blur-sm shadow-lg border-gray-200">
					<CardContent className="flex justify-center p-8">
						<div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
					</CardContent>
				</Card>
			</div>
		)
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
					<CardTitle className="text-2xl text-white">Reset Password</CardTitle>
					<CardDescription className="text-white/80">Enter your new password</CardDescription>
				</CardHeader>
				<CardContent>
					{success ? (
						<div className="text-center space-y-4">
							<div className="text-white bg-green-500/50 rounded-md p-4">
								<p className="font-medium">Password updated successfully!</p>
								<p className="text-sm mt-2">Redirecting to login page...</p>
							</div>
						</div>
					) : error && !isValidSession ? (
						<div className="text-center space-y-4">
							<div className="text-white bg-red-500/50 rounded-md p-4">
								<p className="font-medium">Invalid Reset Link</p>
								<p className="text-sm mt-2">{error}</p>
							</div>
							<Button
								onClick={handleBackToLogin}
								className="w-full bg-blue-600 hover:bg-blue-700"
							>
								Back to Login
							</Button>
						</div>
					) : (
						<form onSubmit={handlePasswordReset} className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="newPassword" className="text-white">New Password</Label>
								<Input
									id="newPassword"
									type="password"
									placeholder="Enter new password"
									required
									value={newPassword}
									onChange={(e) => setNewPassword(e.target.value)}
									className="bg-white/10 text-white placeholder:text-white/60 border-white/20"
									minLength={6}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
								<Input
									id="confirmPassword"
									type="password"
									placeholder="Confirm new password"
									required
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									className="bg-white/10 text-white placeholder:text-white/60 border-white/20"
									minLength={6}
								/>
							</div>
							{error && (
								<p className="text-sm text-white bg-red-500/50 rounded-md p-2 text-center">
									{error}
								</p>
							)}
							<Button 
								type="submit" 
								disabled={isLoading}
								className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
							>
								{isLoading ? "Updating..." : "Update Password"}
							</Button>
							<div className="text-center">
								<Button
									type="button"
									variant="link"
									onClick={handleBackToLogin}
									className="text-white/80 hover:text-white underline p-0"
								>
									Back to Login
								</Button>
							</div>
						</form>
					)}
				</CardContent>
			</Card>
		</div>
	)
}

