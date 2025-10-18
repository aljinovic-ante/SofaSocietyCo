"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { convertToLocale } from "@lib/util/money"
import ErrorMessage from "@modules/checkout/components/error-message"
import { useCartShippingMethods, useSetShippingMethod } from "hooks/cart"
import { StoreCart } from "@medusajs/types"
import { useQueryClient } from "@tanstack/react-query"
import { sdk } from "@lib/config"

export default function Shipping({
  cart,
  onCartUpdate,
}: {
  cart: StoreCart
  onCartUpdate: (updated: StoreCart) => void
}) {
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(
    cart.shipping_methods?.[0]?.shipping_option_id || null
  )
  const [shippingSelected, setShippingSelected] = useState(false)
  const searchParams = useSearchParams()
  const isOpen = searchParams.get("step") === "shipping"

  const { data: availableShippingMethods } = useCartShippingMethods(cart.id)
  const queryClient = useQueryClient()
  const { mutate, isPending } = useSetShippingMethod({ cartId: cart.id })

  const handleSelect = (id: string) => {
    setError(null)
    setSelected(id)
    setShippingSelected(true)
    mutate(
      { shippingMethodId: id },
      {
        onError: (err) => setError(err.message),
        onSuccess: async () => {
          try {
            await queryClient.invalidateQueries({ queryKey: ["cart"] })
            await queryClient.invalidateQueries({
              queryKey: ["shipping-methods", cart.id],
            })

            const response = await sdk.client.fetch(`/store/carts/${cart.id}`)
            const updatedCart = response.cart
            onCartUpdate(updatedCart)
          } catch (e: any) {
            console.error("Failed to refresh cart after shipping change:", e)
          }
        }
      }
    )
  }

  useEffect(() => {
    setError(null)
    setShippingSelected(false)
  }, [isOpen])

  if (!availableShippingMethods?.length) {
    return (
      <p className="text-red-900">
        There are no shipping methods available for your location. Please contact us for assistance.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {availableShippingMethods.map((option) => {
        const isSelected = selected === option.id
        return (
          <div
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className={`flex justify-between items-center p-4 border rounded-md cursor-pointer transition ${
              isSelected
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-400"
            }`}
          >
            <div className="flex flex-col">
              <span className="font-medium">{option.name}</span>
              {isSelected && (
                <span className="text-blue-600 text-sm mt-1">
                  ✓ {option.name} selected
                </span>
              )}
            </div>
            <span className="text-gray-800">
              {convertToLocale({
                amount: option.amount ?? 0,
                currency_code: cart?.currency_code,
              })}
            </span>
          </div>
        )
      })}

      <ErrorMessage error={error} />
      {isPending && <p className="text-sm text-gray-500">Updating...</p>}

      {!shippingSelected && (
        <p className="text-red-600 mt-2 text-sm">Please select a shipping method.</p>
      )}
    </div>
  )
}
