"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSignup } from "@/hooks/customer"

export default function RegisterPage() {
  const router = useRouter()
  const { mutateAsync: signup, isPending, error } = useSignup()
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
  })
  const [passwordError, setPasswordError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setPasswordError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.password) {
      setPasswordError("Password cannot be empty.")
      return
    }

    if (form.password !== form.confirm_password) {
      setPasswordError("Passwords do not match.")
      return
    }

    setPasswordError("")
    await signup(form)
    router.push("/account")
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
            Hey, welcome to
            <br /> Sofa Society!
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 w-full"
          >
            <div className="flex gap-5">
              <input
                name="first_name"
                type="text"
                placeholder="First name"
                value={form.first_name}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-4 py-3 w-1/2 focus:outline-none focus:ring-1 focus:ring-black text-base"
                required
              />
              <input
                name="last_name"
                type="text"
                placeholder="Last name"
                value={form.last_name}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-4 py-3 w-1/2 focus:outline-none focus:ring-1 focus:ring-black text-base"
                required
              />
            </div>

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black text-base"
              required
            />

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

            <div className="flex flex-col">
              <input
                name="confirm_password"
                type="password"
                placeholder="Confirm password"
                value={form.confirm_password}
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
              {isPending ? "Registering..." : "Register"}
            </button>

            {error && (
              <p className="text-red-500 text-sm mt-2">{String(error)}</p>
            )}
          </form>

          <p className="text-sm text-gray-600 mt-8 text-center">
            Already have an account? No worries, just{" "}
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
