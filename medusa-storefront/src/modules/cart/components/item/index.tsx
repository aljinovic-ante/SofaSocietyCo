"use client"

import { useState } from "react"
import { Table } from "@medusajs/ui"
import { updateLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import ErrorMessage from "@modules/checkout/components/error-message"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import Thumbnail from "@modules/products/components/thumbnail"
import LineItemOptions from "@modules/common/components/line-item-options"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  currencyCode: string
}

const Item = ({ item, currencyCode }: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(item.quantity)

  const changeQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) return
    setError(null)
    setUpdating(true)
    setQuantity(newQuantity)
    await updateLineItem({ lineId: item.id, quantity: newQuantity })
      .catch((err) => setError(err.message))
      .finally(() => setUpdating(false))
  }

  const maxQtyFromInventory = 10
  const maxQuantity = item.variant?.manage_inventory ? 10 : maxQtyFromInventory

  return (
    <>
      <Table.Row className="!border-none">
        <Table.Cell className="py-4">
          <div className="relative flex items-start justify-between w-full gap-6">
            <div className="flex gap-6 w-full">
              <LocalizedClientLink
                href={`/products/${item.product_handle}`}
                className="block w-36 h-36 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0"
              >
                <Thumbnail
                  thumbnail={item.thumbnail}
                  images={item.variant?.product?.images}
                  size="square"
                />
              </LocalizedClientLink>

              <div className="flex flex-col justify-between w-full">
                <div>
                  <p className="text-xl font-semibold text-gray-900 mb-1">
                    {item.product_title}
                  </p>
                  <div className="text-sm text-gray-500 mb-3">
                    <LineItemOptions variant={item.variant} />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                    <button
                      onClick={() => changeQuantity(quantity - 1)}
                      disabled={quantity <= 1 || updating}
                      className="w-9 h-9 flex items-center justify-center text-base font-semibold hover:bg-gray-100 disabled:opacity-50"
                    >
                      −
                    </button>
                    <div className="w-10 h-9 flex items-center justify-center text-sm font-medium">
                      {quantity}
                    </div>
                    <button
                      onClick={() => changeQuantity(quantity + 1)}
                      disabled={quantity >= maxQuantity || updating}
                      className="w-9 h-9 flex items-center justify-center text-base font-semibold hover:bg-gray-100 disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>
                  {updating && <Spinner />}
                  <ErrorMessage error={error} />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end justify-between">
              <div className="text-2xl font-bold text-black tracking-tight leading-none">
                <LineItemPrice
                  item={item}
                  style="tight"
                  currencyCode={currencyCode}
                />
              </div>
            </div>

            <div className="absolute bottom-2 right-0 scale-125">
              <DeleteButton id={item.id} />
            </div>
          </div>
        </Table.Cell>
      </Table.Row>
      <tr>
        <td colSpan={4}>
          <div className="border-b border-gray-300 my-2 w-full" />
        </td>
      </tr>
    </>
  )
}

export default Item
