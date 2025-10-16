"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"

export default function CollectionsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount =
        direction === "left"
          ? scrollRef.current.scrollLeft - 496 - 40
          : scrollRef.current.scrollLeft + 496 + 40
      scrollRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" })
    }
  }

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
    <section className="py-20 px-6 md:px-12 max-w-[1200px] mx-auto overflow-hidden">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold">Collections</h2>
        <div className="flex items-center gap-3">
          <Link
            href="/hr/collections"
            className="text-xs bg-black text-white px-4 py-2 rounded hover:opacity-90"
          >
            View All
          </Link>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="border rounded-full w-8 h-8 flex items-center justify-center text-black-600 hover:text-black"
            >
              ←
            </button>
            <button
              onClick={() => scroll("right")}
              className="border rounded-full w-8 h-8 flex items-center justify-center text-black-600 hover:text-black"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-[40px] overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory"
      >
        {collections.map((col, i) => {
          const handle = col.title.replace(/\s+/g, "-").toLowerCase()
          const href = `/${countryCode}/collections/${handle}`

          return (
            <div
              key={i}
              className="w-[396px] flex-shrink-0 flex flex-col snap-center"
            >
              <Link href={href} className="group">
                <Image
                  src={col.image}
                  alt={col.title}
                  width={396}
                  height={600}
                  className="w-[396px] h-[600px] object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
              </Link>

              <Link href={href}>
                <h3 className="mt-4 font-medium text-lg hover:underline">
                  {col.title}
                </h3>
              </Link>

              <p className="text-sm text-black-600 mt-1">{col.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
