"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"

export default function CollectionDropdown() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams)
    if (e.target.value === "all") params.delete("collection")
    else params.set("collection", e.target.value)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="relative">
      <label htmlFor="collection" className="text-sm font-medium text-neutral-700 mr-2">
        Collection
      </label>
      <select
        id="collection"
        onChange={handleChange}
        defaultValue={searchParams.get("collection") || "all"}
        className="appearance-none border border-neutral-300 bg-white rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-500 hover:border-neutral-500 cursor-pointer"
      >
        <option value="all">All</option>
        <option value="scandinavian-simplicity">Scandinavian Simplicity</option>
        <option value="modern-luxe">Modern Luxe</option>
        <option value="boho-chic">Boho Chic</option>
        <option value="timeless-classics">Timeless Classics</option>
      </select>
      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-neutral-500">
        ▼
      </span>
    </div>
  )
}
