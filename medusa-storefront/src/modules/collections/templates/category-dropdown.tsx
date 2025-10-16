"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"

export default function CategoryDropdown() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const handleChange = (e) => {
    const params = new URLSearchParams(searchParams)
    if (e.target.value === "all") params.delete("category")
    else params.set("category", e.target.value)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="relative">
      <label htmlFor="category" className="text-sm font-medium text-neutral-700 mr-2">
        Category
      </label>
      <select
        id="category"
        onChange={handleChange}
        defaultValue={searchParams.get("category") || "all"}
        className="appearance-none border border-neutral-300 bg-white rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-500 hover:border-neutral-500 cursor-pointer"
      >
        <option value="all">All</option>
        <option value="one-seater">One seater</option>
        <option value="two-seater">Two seater</option>
        <option value="three-seater">Three seater</option>
      </select>
      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-neutral-500">
        ▼
      </span>
    </div>
  )
}
