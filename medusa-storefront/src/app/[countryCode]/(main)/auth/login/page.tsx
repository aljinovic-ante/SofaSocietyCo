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
    if (result?.success){
      router.push("/account")
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500">[Image placeholder]</span>
      </div>

      <div className="w-1/2 flex flex-col justify-center px-16">
        <h1 className="text-4xl font-semibold mb-8">
          Welcome back <br /> to Sofa Society!
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
            required
          />
          <div className="flex flex-col">
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-1 ${
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
            className="bg-black text-white rounded-md py-2 mt-2 hover:opacity-90 transition disabled:opacity-50"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{String(error)}</p>}
        </form>

        <p className="text-sm text-gray-600 mt-6">
          Don’t have an account yet?{" "}
          <Link href="/auth/register" className="underline">
            Register
          </Link>
          .
        </p>

        <p className="text-sm text-gray-600 mt-2">
          Forgot your password?{" "}
          <Link href="/reset-password" className="underline">
            Reset it here
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
