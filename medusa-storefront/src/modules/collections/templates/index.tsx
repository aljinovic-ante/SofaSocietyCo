import { Suspense } from "react"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { HttpTypes } from "@medusajs/types"
import CategoryDropdown from "./category-dropdown"

export default async function CollectionTemplate({
  collection,
  page,
  countryCode,
  searchParams,
}: {
  collection: HttpTypes.StoreCollection
  page?: string
  countryCode: string
  searchParams?: { category?: string; sortBy?: SortOptions }
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = searchParams?.sortBy || "created_at"
  const categoryFilter = searchParams?.category || "all"

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 text-black">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 border-b border-neutral-200 pb-6">
        <div className="flex flex-wrap items-center gap-3">
          <CategoryDropdown />
        </div>
        <div className="w-full md:w-auto flex justify-end">
          <RefinementList sortBy={sort} />
        </div>
      </div>

      <Suspense fallback={<SkeletonProductGrid numberOfProducts={collection.products?.length} />}>
        <PaginatedProducts
          sortBy={sort}
          page={pageNumber}
          collectionId={collection.id}
          countryCode={countryCode}
          categoryFilter={categoryFilter}
        />
      </Suspense>
    </section>
  )
}
