"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { retrieveCart } from "@lib/data/cart"

export function CartIcon() {
  const [isOpen, setIsOpen] = useState(false)
  const [cart, setCart] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  async function loadCart() {
    try {
      setLoading(true)
      const c = await retrieveCart()
      setCart(c)
    } catch (err) {
      console.error("Failed to fetch cart:", err)
      setCart(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCart()
  }, [])

  useEffect(() => {
    if (isOpen) loadCart()
  }, [isOpen])

  const quantity =
    cart?.items?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0

  const formatPrice = (amount: number) => {
    const currency = cart?.region?.currency_code?.toUpperCase() || "EUR"
    return new Intl.NumberFormat("en-EU", {
      style: "currency",
      currency,
    }).format(amount)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-1 hover:opacity-70 transition"
        aria-label="Open cart"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <path d="M6 7h12l-1.5 13h-9L6 7z" />
          <path d="M9 7V5a3 3 0 0 1 6 0v2" />
        </svg>
        {quantity > 0 && (
          <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {quantity}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="bg-white w-80 h-full shadow-xl p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-semibold">Cart</p>
              <button
                onClick={() => setIsOpen(false)}
                className="text-black hover:opacity-70 text-xl"
              >
                ×
              </button>
            </div>

            {loading ? (
              <div className="flex-1 flex items-center justify-center text-gray-400">
                Loading...
              </div>
            ) : cart?.items?.length ? (
              <>
                <div className="flex-1 overflow-y-auto space-y-4">
                  {cart.items.map((item: any) => {
                    const product = item.product
                    const img = item.thumbnail || product?.thumbnail || "/placeholder.png"
                    const handle = product?.handle || item.product_handle || "unknown-product"
                    const productLink = `/products/${handle}`

                    return (
                      <div
                        key={item.id}
                        className="flex justify-between items-center border-b border-gray-200 pb-2 gap-3"
                      >
                        <Link
                          href={productLink}
                          className="flex-shrink-0 w-14 h-14 overflow-hidden rounded-md border border-gray-200"
                          onClick={() => setIsOpen(false)}
                        >
                          <Image
                            src={img}
                            alt={product?.title || item.title}
                            width={56}
                            height={56}
                            className="object-cover w-full h-full"
                          />
                        </Link>

                        <div className="flex flex-col flex-1 min-w-0">
                          <Link
                            href={productLink}
                            onClick={() => setIsOpen(false)}
                            className="truncate text-sm font-medium hover:underline"
                          >
                            {product?.title || item.title}
                          </Link>
                          <span className="text-xs text-gray-500 truncate">
                            {(() => {
                              const subtitle = item.subtitle || item.variant_title || ""
                              const [color, material] = subtitle.split(" / ")
                              return `${color || ""}${color && material ? " / " : ""}${material || ""}`
                            })()}
                          </span>
                          <span className="text-xs text-gray-500">
                            {item.quantity} × {formatPrice(item.unit_price)}
                          </span>
                        </div>

                        <span className="text-sm font-semibold whitespace-nowrap">
                          {formatPrice(item.unit_price * item.quantity)}
                        </span>
                      </div>
                    )
                  })}
                </div>

                <div className="border-t pt-4 mt-auto space-y-3">
                  <div className="flex justify-between text-sm font-semibold">
                    <span>Total:</span>
                    <span>{formatPrice(cart.total)}</span>
                  </div>

                  <Link
                    href="/cart"
                    onClick={() => setIsOpen(false)}
                    className="block text-center bg-gray-100 text-black py-2 rounded-md hover:bg-gray-200 transition"
                  >
                    Open Cart
                  </Link>

                  <Link
                    href="/checkout"
                    onClick={() => setIsOpen(false)}
                    className="block text-center bg-black text-white py-2 rounded-md hover:opacity-80 transition"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                Your cart is empty.{" "}
                {/* <a href="/auth/login" className="text-blue-600 hover:underline ml-2">
                  Log in
                </a> */}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
