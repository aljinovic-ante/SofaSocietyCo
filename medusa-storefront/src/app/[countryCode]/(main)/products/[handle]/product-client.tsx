"use client"

import { useState, useMemo, useEffect } from "react"
import { createPortal } from "react-dom"
import { COLORS } from "./colors"
import RelatedProducts from "./related-products"
import CollectionInspired from "./collection-inspired"
import { getProductPrice } from "@/lib/util/get-product-price"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { retrieveCustomer } from "@lib/data/customer"
import { addToCart } from "@lib/data/cart"

export default function ProductClient({ product }: { product: any }) {
  const [selectedMaterial, setSelectedMaterial] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [currentImage, setCurrentImage] = useState(0)
  const [isImageOpen, setIsImageOpen] = useState(false)
  const [customer, setCustomer] = useState<any>(null)
  const [showLoginWarning, setShowLoginWarning] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState<{
    text: string
    type: "success" | "error" | null
  }>({ text: "", type: null })
  const [isAdding, setIsAdding] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    retrieveCustomer().then(setCustomer).catch(() => setCustomer(null))
  }, [])

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
    "Price depends on variant type"

  const canAddToCart = Boolean(selectedVariant)

  const handleAddToCart = async () => {
    setFeedbackMessage({ text: "", type: null })
    if (!customer) {
      setShowLoginWarning(true)
      return
    }
    if (!selectedVariant) return
    setShowLoginWarning(false)
    setIsAdding(true)

    const countryCode = pathname.split("/")[1] || "hr"
    try {
      await addToCart({
        variantId: selectedVariant.id,
        quantity,
        countryCode,
      })
      setFeedbackMessage({ text: "Item added to cart!", type: "success" })
    } catch (error) {
      console.error(error)
      setFeedbackMessage({ text: "Error adding item to cart.", type: "error" })
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <main className="max-w-7xl mx-auto px-8 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 text-black">
      <div className="relative flex flex-col items-center py-10">
        <div
          className="relative w-full aspect-square overflow-hidden rounded-xl bg-neutral-100 cursor-pointer"
          onClick={() => setIsImageOpen(true)}
        >
          <img
            src={images[currentImage]}
            alt={product.title}
            className="object-cover w-full h-full hover:opacity-90 transition"
          />
        </div>

        {isImageOpen &&
          createPortal(
            <div
              className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
              onClick={() => setIsImageOpen(false)}
            >
              <div className="relative max-w-5xl w-full px-4">
                <img
                  src={images[currentImage]}
                  alt={product.title}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <button
                  onClick={() => setIsImageOpen(false)}
                  className="absolute top-4 right-4 text-white text-4xl font-light hover:opacity-70"
                >
                  ×
                </button>
              </div>
            </div>,
            document.body
          )}
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
            disabled={!canAddToCart || isAdding}
            onClick={handleAddToCart}
            className={`px-8 py-3 rounded-md transition ${
              canAddToCart
                ? "bg-black text-white hover:bg-neutral-900"
                : "bg-neutral-400 text-white opacity-70"
            }`}
          >
            {isAdding ? "Adding..." : "Add to cart"}
          </button>
          {showLoginWarning && (
            <p className="text-sm text-red-600 font-semibold">
              Log in to add items to your cart
            </p>
          )}

          {feedbackMessage.type && (
            <p
              className={`text-sm font-semibold ${
                feedbackMessage.type === "success"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {feedbackMessage.text}
            </p>
          )}
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
