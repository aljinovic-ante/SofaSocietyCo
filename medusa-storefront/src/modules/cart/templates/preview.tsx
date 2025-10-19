"use client"

import { useState } from "react"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import Link from "next/link"

type ItemsTemplateProps = {
  cart: HttpTypes.StoreCart
}

const ItemsPreviewTemplate = ({ cart }: ItemsTemplateProps) => {
  const [expanded, setExpanded] = useState(false)
  const items = cart.items || []
  const visibleItems = expanded ? items : items.slice(0, 2)

  return (
    <div className="flex flex-col space-y-8">
      {visibleItems.map((item) => {
        const handle =
          item.product?.handle || item.variant?.product?.handle || ""
        const productUrl = handle ? `/hr/products/${handle}` : "/"
        const subtitle = item.subtitle || item.variant_title || ""
        const [color, material] = subtitle.split(" / ")

        return (
          <div key={item.id} className="flex items-start gap-5">
            <Link href={productUrl} prefetch={false} className="shrink-0">
              {item.thumbnail && (
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="rounded-md bg-gray-100 object-cover hover:opacity-80 transition"
                />
              )}
            </Link>

            <div className="flex flex-col flex-1">
              <Link
                href={productUrl}
                prefetch={false}
                className="font-medium text-base hover:underline hover:text-black transition"
              >
                {item.title}
              </Link>

              <span className="text-sm text-gray-600">
                {color || material ? (
                  <>
                    {color}
                    {color && material ? " / " : ""}
                    {material}
                  </>
                ) : null}
              </span>

              <span className="text-sm text-gray-600">
                Quantity: {item.quantity}
              </span>
            </div>

            <span className="text-base font-medium text-black">
              {(item.unit_price).toFixed(2)}€
            </span>
          </div>
        )
      })}
      {items.length > 2 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-end gap-1 text-sm text-gray-700 hover:text-black transition mt-2 w-full"
        >
          {expanded ? (
            <span>Show less ▲</span>
          ) : (
            <span>Show all ({items.length}) ▼</span>
          )}
        </button>
      )}
    </div>
  )
}

export default ItemsPreviewTemplate
