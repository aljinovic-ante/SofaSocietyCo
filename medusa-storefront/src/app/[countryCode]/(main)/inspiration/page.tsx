"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import CollectionsSection from "../home/CollectionsMenu"
import { listProductsWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"

export default function InspirationPage() {
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const region = await getRegion("hr")
      if (!region) return
      const {
        response: { products },
      } = await listProductsWithSort({
        page: 1,
        queryParams: { limit: 100, region_id: region.id },
        sortBy: "created_at",
        countryCode: "hr",
      })
      const inspirationProducts = products.filter((p) =>
        ["astrid curve", "nordic haven", "nordic breeze", "oslo drift"].includes(
          p.title.toLowerCase()
        )
      )
      setProducts(inspirationProducts)
    }
    fetchProducts()
  }, [])

  const getProduct = (title: string) =>
    products.find((p) => p.title.toLowerCase() === title.toLowerCase())

  const astrid = getProduct("Astrid Curve")
  const haven = getProduct("Nordic Haven")
  const breeze = getProduct("Nordic Breeze")
  const oslo = getProduct("Oslo Drift")

  return (
    <main className="bg-white text-black-900">
      <section className="flex flex-col items-center">
        <img
          src="/images/inspiration/9176ac4e43f584f40878ed292d00ce6f88fb89ed (1).png"
          alt="Living room with dark green sofa"
          className="mb-4 w-full md:w-auto max-w-[1060px] h-auto rounded-md"
        />
      </section>

      <section className="max-w-6xl mx-auto px-8 md:px-16 mb-24 mt-14">
        <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-semibold mb-9 leading-snug">
              The {astrid?.title || "Astrid Curve"} sofa is a masterpiece of minimalism and luxury.
            </h2>
            <p className="text-black-600 text-lg md:text-xl leading-relaxed max-w-2xl">
              Our design philosophy revolves around creating pieces that are both
              beautiful and practical. Inspired by Scandinavian simplicity,
              modern luxury, and timeless classics.
            </p>
          </div>

           {astrid && (
              <div className="flex flex-col items-center md:translate-x-10">
                <Link href={`/products/${astrid.handle}`}>
                  <div className="overflow-hidden rounded-md mb-4" style={{ width: "320px", height: "360px" }}>
                    <img
                      src={astrid.thumbnail}
                      alt={astrid.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
                <div className="flex justify-between text-sm" style={{ width: "320px" }}>
                  <div>
                    <p className="font-medium text-base">{astrid.title}</p>
                    <p className="text-black-500 text-xs">{astrid.collection?.title}</p>
                  </div>
                  <p className="font-semibold text-base">
                    {astrid.variants?.[0]?.calculated_price?.calculated_amount
                      ? `${astrid.variants[0].calculated_price.calculated_amount.toFixed(2)} €`
                      : "—"}
                  </p>
                </div>
              </div>
            )}
            </div>
      </section>


      {haven && breeze && (
        <section className="max-w-6xl mx-auto px-6 md:px-12 mb-24">
          <img
            src="/images/inspiration/image.png"
            alt="Haven Sofas in living room"
            className="w-full h-[700px] object-cover mb-16 rounded-lg"
          />
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-4xl md:text-5xl font-semibold mb-6 leading-snug min-w-[540px]">
                The {haven.title} Sofas have minimalistic designs, neutral colors, and
                high-quality textures.
              </h2>
              <p className="text-black-600 text-lg md:text-xl max-w-lg py-10">
                Perfect for those who seek comfort with a clean and understated
                aesthetic. This collection brings the essence of Scandinavian
                elegance to your living room.
              </p>
            </div>

            <div className="space-y-10 md:translate-x-16">
              {[haven, breeze].map((p) => (
                  <div key={p.id} className="flex flex-col items-center">
                    <Link href={`/products/${p.handle}`}>
                      <div
                        className="overflow-hidden rounded-md mb-4"
                        style={{ width: "340px", height: "360px" }}
                      >
                        <img
                          src={p.thumbnail}
                          alt={p.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>
                    <div className="flex justify-between text-base font-medium w-[340px]">
                      <div>
                        <p className="font-semibold text-lg">{p.title}</p>
                        <p className="text-black text-sm font-normal">
                          {p.collection?.title}
                        </p>
                      </div>
                      <p className="font-semibold text-lg">
                        {p.variants?.[0]?.calculated_price?.calculated_amount
                          ? `${p.variants[0].calculated_price.calculated_amount.toFixed(2)} €`
                          : "—"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}


      {oslo && (
        <section className="max-w-6xl mx-auto px-6 md:px-12 mb-24">
          <img
            src="/images/inspiration/image (1).png"
            alt="Oslo Drift interior"
            className="w-full h-[600px] object-cover mb-16 rounded-lg"
          />
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-[34px] font-semibold mb-6 leading-snug">
                {oslo.title} is infused with playful textures and vibrant patterns.
              </h2>
              <p className="text-black-600 text-base md:text-lg max-w-lg">
                Whether you're looking for bold statement pieces or subtle elegance,
                this collection elevates your home with a touch of glamour,
                sophistication, and unmatched coziness.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <Link href={`/products/${oslo.handle}`}>
                <img
                  src={oslo.thumbnail}
                  alt={oslo.title}
                  className="mb-4 w-full max-w-[320px] h-auto rounded-md"
                />
              </Link>
              <div className="flex justify-between text-sm w-full max-w-[320px]">
                <div>
                  <p className="font-medium">{oslo.title}</p>
                  <p className="text-black-500 text-xs">{oslo.collection?.title}</p>
                </div>
                <p className="font-semibold">
                  {oslo.variants?.[0]?.calculated_price?.calculated_amount
                    ? `${oslo.variants[0].calculated_price.calculated_amount.toFixed(2)} €`
                    : "—"}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      <CollectionsSection />
    </main>
  )
}
