import Image from "next/image"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { getCollectionByHandle, listCollections } from "@lib/data/collections"
import { listRegions } from "@lib/data/regions"
import { StoreCollection, StoreRegion } from "@medusajs/types"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { Suspense } from "react"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import CategoryDropdown from "@modules/collections/templates/category-dropdown"
import RefinementList from "@modules/store/components/refinement-list"

const collections = [
  {
    title: "Scandinavian Simplicity",
    description:
      "Minimalistic designs, neutral colors, and high-quality textures. Perfect for those who seek comfort with a clean and understated aesthetic.",
    image: "/images/homepage/scan-simp.png",
  },
  {
    title: "Modern Luxe",
    description:
      "Sophisticated and sleek, these sofas blend modern design with luxurious comfort. Perfect for those who love refinement and timeless design.",
    image: "/images/homepage/image (3).png",
  },
  {
    title: "Boho Chic",
    description:
      "Infused with playful textures and patterns with eclectic vibes. Perfect for those who embrace creativity and warmth.",
    image: "/images/homepage/2f65c59ba6ffc70cd10f9cc6555184149e334e59.png",
  },
  {
    title: "Timeless Classics",
    description:
      "Modern silhouettes and cozy fabrics create an inviting atmosphere for the contemporary home.",
    image: "/images/homepage/9176ac4e43f584f40878ed292d00ce6f88fb89ed.png",
  },
]

type Props = {
  params: { handle: string; countryCode: string }
  searchParams: { page?: string; sortBy?: SortOptions; category?: string }
}

export async function generateStaticParams() {
  const { collections } = await listCollections({ fields: "*products" })
  if (!collections) return []

  const countryCodes = await listRegions().then(
    (regions: StoreRegion[]) =>
      regions
        ?.map((r) => r.countries?.map((c) => c.iso_2))
        .flat()
        .filter(Boolean) as string[]
  )

  const handles = collections.map((c: StoreCollection) => c.handle)

  return countryCodes
    ?.map((countryCode: string) =>
      handles.map((handle) => ({ countryCode, handle }))
    )
    .flat()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const collection = await getCollectionByHandle(params.handle)
  if (!collection) notFound()

  return {
    title: `${collection.title} | Sofa Society`,
    description: `${collection.title} collection`,
  }
}

export default async function CollectionPage({ params, searchParams }: Props) {
  const { handle, countryCode } = params
  const { page, category, sortBy } = searchParams

  const medusaCollection = await getCollectionByHandle(handle)
  if (!medusaCollection) notFound()

  const localCollection = collections.find(
    (c) => c.title.replace(/\s+/g, "-").toLowerCase() === handle
  )

  const currentPage = page ? parseInt(page) : 1

  return (
    <main className="bg-white text-black pb-24 py-20">
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <div className="w-full overflow-hidden rounded-md mb-12">
          <img
            src={localCollection?.image || "/images/homepage/image.png"}
            alt={localCollection?.title || medusaCollection.title}
            className="w-full h-auto rounded-md object-cover"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-4">
              {localCollection?.title || medusaCollection.title}
            </h1>
          </div>
          <div className="text-neutral-600 leading-relaxed text-lg">
            <p className="mb-4">{localCollection?.description}</p>
            <p>
              This collection brings the essence of{" "}
              <strong className="font-bold">
                {(localCollection?.title || medusaCollection.title).toUpperCase()}{" "}
              </strong>
              into your living room.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-neutral-200 pb-6 mb-10">
          <div className="flex flex-wrap items-center gap-3">
            <CategoryDropdown />
          </div>

          <div className="w-full md:w-auto flex justify-end">
            <RefinementList sortBy={(sortBy as SortOptions) || "created_at"} />
          </div>
        </div>

        <div className="flex flex-col gap-12">
          <Suspense fallback={<SkeletonProductGrid numberOfProducts={12} />}>
            <PaginatedProducts
              sortBy={sortBy}
              page={currentPage}
              countryCode={countryCode}
              collectionId={medusaCollection.id}
              categoryFilter={category || "all"}
            />
          </Suspense>
        </div>
      </section>
    </main>
  )
}
