"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import SortProducts, { SortOptions } from "./sort-products"

type RefinementListProps = {
  sortBy: SortOptions
  search?: boolean
  "data-testid"?: string
}

const RefinementList = ({
  sortBy,
  "data-testid": dataTestId,
}: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`)
  }

  return (
    <div className="relative">
      <label
        htmlFor="sort"
        className="text-sm font-medium text-neutral-700 mr-2"
      >
        Sort by
      </label>
      <div className="inline-block relative">
        <select
          id="sort"
          defaultValue={sortBy}
          onChange={(e) => setQueryParams("sortBy", e.target.value)}
          className="appearance-none border border-neutral-300 bg-white rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-500 hover:border-neutral-500 cursor-pointer"
          data-testid={dataTestId}
        >
          <option value="created_at">Newest first</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-neutral-500">
          ▼
        </span>
      </div>
    </div>
  )
}

export default RefinementList
