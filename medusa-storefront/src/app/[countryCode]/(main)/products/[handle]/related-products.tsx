"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export default function RelatedProducts({
  collectionId,
  currentProductId,
}: {
  collectionId: string
  currentProductId: string
}) {
  const [related, setRelated] = useState<any[]>([])
  const pathname = usePathname()
  const countryCode = pathname.split("/")[1] || "hr"

  useEffect(() => {
    async function fetchRelated() {
      try {
        const regionRes = await fetch(
          `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/regions`,
          {
            headers: {
              "x-publishable-api-key":
                process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
            },
          }
        )

        const regionData = await regionRes.json()
        const region =
          regionData.regions?.find((r: any) =>
            r.countries?.some(
              (c: any) => c.iso_2?.toLowerCase() === countryCode.toLowerCase()
            )
          ) || regionData.regions?.[0]

        const regionId = region?.id
        if (!regionId) {
          console.error("No region found for", countryCode)
          return
        }

        const url = `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/products?collection_id=${collectionId}&region_id=${regionId}`
        console.log("Fetching related products from:", url)

        const res = await fetch(url, {
          headers: {
            "x-publishable-api-key":
              process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
          },
        })

        const text = await res.text()
        if (!res.ok) {
          console.error("Failed to fetch related products:", text)
          return
        }

        const data = JSON.parse(text)
        const products = (data.products || []).filter(
          (p: any) => p.id && p.id !== currentProductId
        )

        console.log("✅ Related products fetched:", products.length)
        const shuffled = products.sort(() => 0.5 - Math.random()).slice(0, 3)
        setRelated(shuffled)
      } catch (err) {
        console.error("Failed to load related products:", err)
      }
    }

    if (collectionId) fetchRelated()
  }, [collectionId, currentProductId, countryCode])

  if (!related.length) return null

  return (
    <section className="mt-24 col-span-2 py-0">
      <h1 className="text-5xl md:text-5xl font-semibold mb-10 text-center md:text-left">
        Related products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
        {related.map((p) => {
          const variant = p.variants?.[0]
          const price =
            variant?.calculated_price?.calculated_amount ??
            variant?.prices?.[0]?.amount

          return (
            <Link
              key={p.id}
              href={`/${countryCode}/products/${p.handle}`}
              className="group block transition-transform hover:scale-[1.01]"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-lg bg-neutral-100 mb-4">
                <img
                  src={p.thumbnail || p.images?.[0]?.url}
                  alt={p.title}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{p.title}</p>
                  <p className="text-sm text-black">
                    {p.collection?.title || "—"}
                  </p>
                </div>
                <div className="text-right min-w-[70px]">
                  <p className="font-semibold">
                    {price ? `€${(price).toFixed(0)}` : "—"}
                  </p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
