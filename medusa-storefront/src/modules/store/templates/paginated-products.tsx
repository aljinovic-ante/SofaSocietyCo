import Link from "next/link"
import { listProductsWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

const PRODUCT_LIMIT = 12

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  countryCode,
  categoryFilter,
  collectionFilter,
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
  countryCode: string
  categoryFilter?: string
  collectionFilter?: string
}) {
  const region = await getRegion(countryCode)
  if (!region) return null

  const queryParams: Record<string, any> = {
    limit: 100,
    region_id: region.id,
  }

  if (collectionId) {
    queryParams.collection_id = collectionId
  }

  if (categoryId) {
    queryParams.category_id = categoryId
  }

  const {
    response: { products },
  } = await listProductsWithSort({
    page: 1,
    queryParams,
    sortBy,
    countryCode,
  })

  const catFilter = categoryFilter?.toLowerCase()?.trim()
  const collFilter = collectionFilter?.toLowerCase()?.trim()
  const isCatFiltering = catFilter && catFilter !== "all"
  const isCollFiltering = collFilter && collFilter !== "all"

  const filteredProducts = products.filter((p) => {
    const matchesCategory = !isCatFiltering
      ? true
      : p.categories?.some((cat) => {
          const name = cat.name?.toLowerCase().replace(/-/g, " ") || ""
          const handle = cat.handle?.toLowerCase().replace(/-/g, " ") || ""
          const normalized = catFilter.replace(/-/g, " ")
          const synonyms: Record<string, string[]> = {
            "one seater": ["1 seater", "single seater"],
            "two seater": ["2 seater", "double seater"],
            "three seater": ["3 seater", "triple seater"],
          }
          const altMatches = synonyms[normalized]?.some(
            (alt) => name.includes(alt) || handle.includes(alt)
          )
          return (
            name.includes(normalized) ||
            handle.includes(normalized) ||
            altMatches
          )
        })

    const matchesCollection = !isCollFiltering
      ? true
      : (() => {
          const title =
            p.collection?.title?.toLowerCase().replace(/-/g, " ") || ""
          const handle =
            p.collection?.handle?.toLowerCase().replace(/-/g, " ") || ""
          const normalized = collFilter.replace(/-/g, " ")
          return title.includes(normalized) || handle.includes(normalized)
        })()

    return matchesCategory && matchesCollection
  })

  const totalFilteredCount = filteredProducts.length
  const totalPages = Math.ceil(totalFilteredCount / PRODUCT_LIMIT)
  const startIndex = (page - 1) * PRODUCT_LIMIT
  const endIndex = startIndex + PRODUCT_LIMIT
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

  if (paginatedProducts.length === 0) {
    return (
      <p className="text-center text-neutral-500 mt-12">
        No products found.
      </p>
    )
  }

  return (
    <>
      <ul
        className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-3 gap-x-6 gap-y-8 flex-1"
        data-testid="products-list"
      >
        {paginatedProducts.map((p) => (
          <li key={p.id} className="flex flex-col">
            <Link href={`/products/${p.handle}`} className="group">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-neutral-100">
                <img
                  src={p.thumbnail ?? ""}
                  alt={p.title}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>

            <div className="mt-4 flex flex-col justify-between flex-1">
              <div className="flex items-center justify-between">
                <Link
                  href={`/products/${p.handle}`}
                  className="text-base font-medium text-black hover:underline"
                >
                  {p.title}
                </Link>
                <p className="text-sm font-semibold whitespace-nowrap ml-4">
                  {p.variants?.[0]?.calculated_price?.calculated_amount
                    ? `${p.variants[0].calculated_price.calculated_amount.toFixed(2)} €`
                    : "—"}
                </p>
              </div>

              <p className="text-sm text-neutral-500 mt-1">
                {p.collection?.title || "No collection"}
              </p>

              <p className="text-xs text-neutral-400 mt-1">
                {p.categories?.length
                  ? p.categories.map((c) => c.name).join(", ")
                  : "No categories"}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
        />
      )}
    </>
  )
}
