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
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
  countryCode: string
  categoryFilter?: string
}) {
  const region = await getRegion(countryCode)
  if (!region) return null

  const queryParams: Record<string, any> = {
    limit: PRODUCT_LIMIT,
    collection_id: collectionId || undefined,
    category_id: typeof categoryId === "string" ? categoryId : undefined,
    region_id: region.id,
  }

  const {
    response: { products, count },
  } = await listProductsWithSort({
    page,
    queryParams,
    sortBy,
    countryCode,
  })

  const filter = categoryFilter?.toLowerCase()?.trim()
  const isFiltering = filter && filter !== "all"

  const filteredProducts = isFiltering
    ? products.filter((p) =>
        p.categories?.some((cat) => {
          const name = cat.name?.toLowerCase() || ""
          const handle = cat.handle?.toLowerCase() || ""
          return (
            name.includes(filter.replace("-", " ")) ||
            handle.includes(filter.replace("-", " "))
          )
        })
      )
    : products

  const totalPages = Math.ceil(filteredProducts.length / PRODUCT_LIMIT)

  filteredProducts.forEach((p) => {
    console.log("Server ovde 4 ->", p.title, p.categories?.map((c) => c.name))
  })

  return (
    <>
      <ul
        className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-3 gap-x-6 gap-y-8 flex-1"
        data-testid="products-list"
      >
        {filteredProducts.map((p) => (
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
                Categories:{" "}
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
