"use client"

import Image from "next/image"
import Link from "next/link"

export default function CollectionsGrid({ showTitle = true }: { showTitle?: boolean }) {
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

  const countryCode = "hr"

  return (
    <section className="py-16 px-4 md:px-10 max-w-7xl mx-auto">
      {showTitle && (
        <h1 className="text-3xl font-semibold mb-10 text-center py-10">
          All our collections
        </h1>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {collections.map((col, i) => {
          const handle = col.title.replace(/\s+/g, "-").toLowerCase()
          const href = `/${countryCode}/collections/${handle}`

          return (
            <Link
              key={i}
              href={href}
              className="group block rounded-md overflow-hidden"
            >
              <div className="relative w-full h-[440px] bg-neutral-100 rounded-md overflow-hidden">
                <Image
                  src={col.image}
                  alt={col.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <h3 className="mt-3 font-medium text-lg hover:underline text-center">
                {col.title}
              </h3>

              <p className="text-sm text-neutral-600 mt-1 text-center">
                {col.description}
              </p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
