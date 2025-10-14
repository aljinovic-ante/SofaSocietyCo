"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLogin } from "@/hooks/customer"

export default function LoginPage() {
  const router = useRouter()
  const { mutateAsync: login, isPending, error } = useLogin()
  const [form, setForm] = useState({ email: "", password: "" })
  const [passwordError, setPasswordError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (e.target.name === "password") setPasswordError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.password) {
      setPasswordError("Password cannot be empty.")
      return
    }
    const result = await login({
      email: form.email,
      password: form.password,
    })
    if (result?.success) {
      router.push("/account")
    } 
    else {
      setPasswordError(result?.message || "Invalid email or password.")
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
            Welcome back
            <br /> to Sofa Society!
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black text-base"
              required
            />

            <div className="flex flex-col">
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className={`border rounded-md px-4 py-3 focus:outline-none focus:ring-1 text-base ${
                  passwordError
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-black"
                }`}
                required
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="bg-black text-white rounded-md py-3 mt-3 text-base hover:opacity-90 transition disabled:opacity-50"
            >
              {isPending ? "Logging in..." : "Login"}
            </button>

            {error && (
              <p className="text-red-500 text-sm mt-2">{String(error)}</p>
            )}
          </form>

          <p className="text-sm text-gray-600 mt-8 text-center">
            You don’t have an account yet?{" "}
            <Link href="/auth/register" className="underline">
              Register
            </Link>
            .
          </p>

          <p className="text-sm text-gray-600 mt-2 text-center">
            Forgot your password?{" "}
            <Link href="#" className="underline">
              Reset your password
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
