import CollectionsGrid from "../collections/page"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { Suspense } from "react"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import CategoryDropdown from "@modules/collections/templates/category-dropdown"
import { Pagination } from "@modules/store/components/pagination"
import CollectionDropdown from "./collection-dropdown"

export default function ShopPage({
  searchParams,
}: {
  searchParams: { page?: string; sortBy?: string; category?: string; collection?: string }
}) {
  const { page, sortBy, category, collection } = searchParams
  const countryCode = "hr"

  return (
    <main className="bg-white text-black-900 pb-24 py-20">
      <section className="max-w-7xl mx-auto py-10">
        <div className="px-4 md:px-8 mb-2">
          <h1 className="text-3xl font-semibold">Collections</h1>
        </div>
        <CollectionsGrid showTitle={false} />
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <h1 className="text-3xl font-semibold mb-8 text-left">Shop</h1>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-neutral-200 pb-6 mb-10">
          <div className="flex flex-wrap items-center gap-3">
            <CollectionDropdown />
            <CategoryDropdown />
          </div>

          <div className="w-full md:w-auto flex justify-end">
            <RefinementList sortBy={(sortBy as SortOptions) || "created_at"} />
          </div>
        </div>

        <div className="flex flex-col gap-12">
          <Suspense fallback={<SkeletonProductGrid numberOfProducts={12} />}>
            <PaginatedProducts
              sortBy={(sortBy as SortOptions) || "created_at"}
              page={page ? parseInt(page) : 1}
              countryCode={countryCode}
              categoryFilter={category || "all"}
              collectionFilter={collection || "all"}
            />
          </Suspense>
        </div>
      </section>
    </main>
  )
}
