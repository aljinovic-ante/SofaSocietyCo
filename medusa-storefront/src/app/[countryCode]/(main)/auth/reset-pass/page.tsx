"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { resetPassword } from "@lib/data/customer"

export default function ResetPassPage() {
  const params = useSearchParams()
  const router = useRouter()

  const token = params.get("token")
  const email = params.get("email")

  console.log("ResetPassPage mounted")
  console.log("token:", token)
  console.log("email:", email)

  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")




const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  setError("")
  setMessage("")

  if (!token || !email) {
    console.error("Missing token or email")
    setError("Invalid or expired reset link.")
    return
  }

  if (newPassword !== confirmPassword) {
    console.error("Passwords do not match")
    setError("Passwords do not match.")
    return
  }

  if (newPassword.length < 6) {
    console.error("Password is too short")
    setError("Password must be at least 6 characters long.")
    return
  }

  try {
    setIsSubmitting(true)
    console.log("Calling resetPassword with:")
    console.log("Email:", email)
    console.log("Password length:", newPassword.length)
    console.log("FULL TOKEN:", token)

    const result = await resetPassword({}, {
      email,
      new_password: newPassword,
      type: "forgot",
      token,
    })

    console.log("📬 resetPassword result:", result)

    if (result.state === "success") {
      console.log("Password reset successful, redirecting...")
      setMessage("Password reset successful! Redirecting to login...")
      setTimeout(() => router.push("/auth/login"), 2500)
    } else {

    }
  } catch (err) {
    console.error("Exception during password reset:", err)
    setError("Something went wrong. Please try again.")
  } finally {
    setIsSubmitting(false)
    console.log("handleSubmit finished")
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
            Reset your
            <br /> password (WIP)
          </h1>

          <p className="text-gray-600 text-base mb-6">
            Enter your new password below to complete the reset process.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border border-black-300 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black text-base"
              required
            />

            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              {isSubmitting ? "Resetting..." : "Reset password"}
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
