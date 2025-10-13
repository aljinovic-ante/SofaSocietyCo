"use client"

import Link from "next/link"
import { useState, useRef } from "react"
import { useCustomer, useSignout } from "@/hooks/customer"
import { useRouter } from "next/navigation"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [lang, setLang] = useState("HR")
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { data: customer } = useCustomer()
  const { mutate: signout, isPending: signingOut } = useSignout()
  const router = useRouter()

  const handleLogout = () => {
    signout("hr", {
      onSuccess: () => {
        setTimeout(() => {
          router.push("/")
          router.refresh()
        }, 200)
      },
    })
  }

  return (
    <header className="fixed top-0 left-0 w-full bg-white z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-6 px-8">
        <div className="flex items-center gap-4 text-xl font-semibold tracking-tight text-black">
          <Link href="/">SofaSocietyCo.</Link>
          <span className="text-sm text-gray-500">{customer?.email || "offline"}</span>
        </div>

        <nav className="flex gap-10 text-sm font-medium">
          <Link href="#" className="text-black hover:opacity-70 transition">About</Link>
          <Link href="#" className="text-black hover:opacity-70 transition">Inspiration</Link>
          <Link href="#" className="text-black hover:opacity-70 transition">Shop</Link>
        </nav>

        <div className="flex items-center gap-6 text-black text-sm font-medium">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-1 hover:opacity-70 transition"
            >
              {lang} ▼
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-200 rounded-md shadow-md z-10">
                {["EN", "DE", "FR", "IT", "ES"].map((code) => (
                  <button
                    key={code}
                    onClick={() => {
                      setLang(code)
                      setIsOpen(false)
                    }}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    {code}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="hover:opacity-70 transition">Search</button>
          <button className="hover:opacity-70 transition">Cart</button>

          {customer ? (
            <button
              onClick={handleLogout}
              disabled={signingOut}
              className="hover:opacity-70 transition"
            >
              {signingOut ? "Logging out..." : "Logout"}
            </button>
          ) : (
            <Link href="/auth/login" className="hover:opacity-70 transition">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
