"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { sdk } from "@lib/config"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setMessage("")

    if (!email.trim()) {
      setError("Please enter your email address.")
      return
    }

    try {
      setIsSubmitting(true)
      console.log("Submitting password reset for email:", email)

      await sdk.auth.resetPassword("customer", "emailpass", { identifier: email })

      setMessage("If an account with that email exists, you’ll receive a reset link shortly.")
      setEmail("")
    } catch (err) {
      console.error("Password reset request failed:", err)
      setError("Something went wrong. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 h-screen">
        <img
          src="/images/auth/Image (4).png"
          alt="Auth illustration"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center px-24">
        <div className="w-full max-w-lg">
          <h1 className="text-5xl font-semibold mb-10 leading-tight">
            Forgot your
            <br /> password?
          </h1>

          <p className="text-gray-600 text-base mb-6">
            Enter your email address and we’ll send you a link to reset your password. This feature is Work In Progress. Email will be sent though.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-black-300 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black text-base"
              required
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-600 text-sm">{message}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-black text-white rounded-md py-3 mt-3 text-base hover:opacity-90 transition disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send reset link"}
            </button>
          </form>

          <p className="text-sm text-gray-700 mt-8 text-center">
            Remembered your password?{" "}
            <Link href="/auth/login" className="underline">
              Log in
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
