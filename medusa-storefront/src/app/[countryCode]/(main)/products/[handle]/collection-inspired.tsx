"use client"

import Image from "next/image"
import Link from "next/link"

const collections = [
  {
    title: "Scandinavian Simplicity",
    description:
      "Minimalistic designs, neutral colors, and high-quality textures",
    image: "/images/homepage/image 3.png",
  },
  {
    title: "Modern Luxe",
    description:
      "Sophisticated and sleek, these sofas blend modern design with luxurious comfort",
    image: "/images/homepage/image.png",
  },
  {
    title: "Boho Chic",
    description:
      "Infused with playful textures and patterns with eclectic vibes",
    image:
      "/images/homepage/2f65c59ba6ffc70cd10f9cc6555184149e334e59.png",
  },
  {
    title: "Timeless Classics",
    description:
      "Modern silhouettes and cozy fabrics create an inviting atmosphere",
    image:
      "/images/homepage/9176ac4e43f584f40878ed292d00ce6f88fb89ed.png",
  },
]

type CollectionInspiredProps = {
  currentProductId: string
  collectionId?: string
  productTitle?: string
}

export default function CollectionInspired({
  currentProductId,
  collectionId,
  productTitle,
}: CollectionInspiredProps) {
  const collection =
    collections.find(
      (c) =>
        c.title.replace(/\s+/g, "").toLowerCase() ===
        (collectionId ?? "").replace(/\s+/g, "").toLowerCase()
    ) || collections.find((c) => c.title === "Modern Luxe")

  if (!collection) return null

  return (
    <section className="max-w-7xl mx-auto text-black px-8">
      <h1 className="text-5xl md:text-5xl font-semibold mb-10 text-center md:text-left">
        Collection inspired interior
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-full aspect-[16/10] md:h-[480px] overflow-hidden rounded-2xl shadow-md">
            <Image
              src={collection.image}
              alt={collection.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center md:pl-20 mt-10 md:mt-0 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight mb-6 max-w-lg">
                {collection.description}
            </h2>

            <Link
                href={`/collections/${collection.title
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
                className="text-base underline underline-offset-4 hover:opacity-70 transition-opacity"
            >
                See more out of ‘{collection.title}’ collection
            </Link>
        </div>
      </div>
    </section>
  )
}
