import Image from "next/image"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { getCollectionByHandle, listCollections } from "@lib/data/collections"
import { listRegions } from "@lib/data/regions"
import { StoreCollection, StoreRegion } from "@medusajs/types"
import CollectionTemplate from "@modules/collections/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

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

export const PRODUCT_LIMIT = 12

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

  return (
      <main className="text-black pb-24">
        <section className="max-w-7xl mx-auto flex flex-col items-center px-6 md:px-12 py-5">
          <div className="w-full overflow-hidden rounded-md">
            <img
                  src={localCollection?.image || "/images/homepage/image.png"}
                  alt={localCollection?.title || medusaCollection.title}
                  className="w-full h-auto rounded-md object-cover"
                />
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 grid md:grid-cols-2 gap-12 items-center">
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
        </section>

      <CollectionTemplate
        collection={medusaCollection}
        page={page}
        countryCode={countryCode}
        searchParams={{ category, sortBy }}
      />
    </main>
  )
}
