"use client"

import { useState, useMemo, useEffect } from "react"
import { COLORS } from "./colors"
import RelatedProducts from "./related-products"
import CollectionInspired from "./collection-inspired"
import { getProductPrice } from "@/lib/util/get-product-price"
import Link from "next/link"
import { usePathname } from "next/navigation"

// const countryCode = pathname.split("/")[1] || "hr"


export default function ProductClient({ product }: { product: any }) {
  const [selectedMaterial, setSelectedMaterial] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [currentImage, setCurrentImage] = useState(0)
  const pathname = usePathname()

  const images = product?.images?.length
    ? product.images.map((i: any) => i.url)
    : [product.thumbnail]

  const materialOption = product.options?.find(
    (o: any) =>
      o.title.toLowerCase() === "material" || o.title.toLowerCase() === "materials"
  )
  const productMaterials = materialOption?.values?.map((v: any) => v.value.trim()) || []

  useEffect(() => {
    setSelectedColor("")
  }, [selectedMaterial])

  const availableColors = useMemo(() => {
    if (!selectedMaterial) return []

    const variantsForMaterial = product.variants?.filter((variant: any) =>
      variant.options?.some(
        (opt: any) =>
          opt.option?.title?.toLowerCase() === "material" &&
          opt.value?.toLowerCase() === selectedMaterial.toLowerCase()
      )
    )

    const colors = new Set<string>()

    variantsForMaterial?.forEach((variant: any) => {
      variant.options?.forEach((opt: any) => {
        if (
          opt.option?.title?.toLowerCase() === "color" ||
          opt.option?.title?.toLowerCase() === "colors"
        ) {
          colors.add(opt.value.trim())
        }
      })
    })

    return Object.entries(COLORS).filter(([name]) =>
      Array.from(colors).some(
        (c) => c.trim().toLowerCase() === name.trim().toLowerCase()
      )
    )
  }, [selectedMaterial, product.variants])

  const selectedVariant = useMemo(() => {
    return product.variants?.find((variant: any) => {
      const materialMatch = variant.options?.some(
        (opt: any) =>
          opt.option?.title?.toLowerCase() === "material" &&
          opt.value?.toLowerCase() === selectedMaterial.toLowerCase()
      )
      const colorMatch = variant.options?.some(
        (opt: any) =>
          opt.option?.title?.toLowerCase() === "color" &&
          opt.value?.toLowerCase() === selectedColor.toLowerCase()
      )
      return materialMatch && colorMatch
    })
  }, [selectedMaterial, selectedColor, product.variants])

  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: selectedVariant?.id,
  })

  const displayedPrice =
    variantPrice?.calculated_price ||
    cheapestPrice?.calculated_price ||
    "Price depends on variant typ"

  const canAddToCart = Boolean(selectedVariant)

  return (
    <main className="max-w-7xl mx-auto px-8 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 text-black">
      <div className="relative flex flex-col items-center py-10">
        <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-neutral-100">
          <img
            src={images[currentImage]}
            alt={product.title}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <div className="flex flex-col gap-6 py-10">
        <p className="text-sm uppercase tracking-wide">
          {product.collection && (
            <Link
              href={`/hr/collections/${product.collection.handle}`}
              className="text-sm uppercase tracking-wide hover:underline"
            >
              {product.collection.title}
            </Link>
          )}
          {!product.collection && (
            <p className="text-sm uppercase tracking-wide">Collection</p>
          )}
        </p>

        <h1 className="text-4xl font-semibold">{product.title}</h1>

        <p className="text-xl font-medium">{displayedPrice}</p>

        <p className="leading-relaxed">
          {typeof product.description === "string" ? product.description : ""}
        </p>

        {productMaterials.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <p className="text-sm font-medium">Materials</p>
              {selectedMaterial && (
                <p className="text-sm text-neutral-600">({selectedMaterial})</p>
              )}
            </div>
            <select
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
              className="border border-black rounded-md px-3 py-2 text-sm focus:outline-none w-50"
            >
              <option value="">Select material</option>
              {productMaterials.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedMaterial && availableColors.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <p className="text-sm font-medium">Colors</p>
              {selectedColor && (
                <p className="text-sm text-neutral-600">({selectedColor})</p>
              )}
            </div>
            <div className="flex gap-3 flex-wrap">
              {availableColors.map(([name, hex]) => (
                <div
                  key={name}
                  onClick={() => setSelectedColor(name)}
                  className={`w-7 h-7 rounded-md cursor-pointer border ${
                    selectedColor === name ? "border-black" : "border-neutral-400"
                  }`}
                  title={name}
                  style={{ backgroundColor: hex as string }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-4">
          <button
            disabled={!canAddToCart}
            className={`px-8 py-3 rounded-md transition ${
              canAddToCart
                ? "bg-black text-white hover:bg-neutral-900"
                : "bg-neutral-400 text-white opacity-70"
            }`}
          >
            Add to cart
          </button>
        </div>
      </div>
      <CollectionInspired
        currentProductId={product.id}
        collectionId={product.collection?.title}
        productTitle={product.title}
      />    
      <RelatedProducts
        collectionId={product.collection?.id}
        currentProductId={product.id}
      />
    </main>
  )
}
