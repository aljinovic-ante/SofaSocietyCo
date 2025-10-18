"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { sdk } from "@lib/config"

const DEFAULT_REGION_ID = "reg_01K7P8H7TRF9E0AXS39PAGVT5H"

export const useCartShippingMethods = (cartId: string) => {
  return useQuery({
    queryKey: ["shipping-methods", cartId],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/shipping-options?cart_id=${cartId}`,
          {
            headers: {
              "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY!,
            },
          }
        )
        const data = await res.json()
        console.log("SHIPPING OPTIONS RESPONSE:", data)
        return data?.shipping_options || []
      } catch (err) {
        console.error("ERROR FETCHING SHIPPING OPTIONS:", err)
        return []
      }
    },
    enabled: !!cartId,
  })
}


export const useSetShippingMethod = (
  { cartId }: { cartId: string }
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["set-shipping-method", cartId],
    mutationFn: async ({ shippingMethodId }: { shippingMethodId: string }) => {
      await sdk.store.cart.addShippingMethod(cartId, { option_id: shippingMethodId })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cart"] })
    },
  })
}

async function fetchCart() {
  try {
    const result = await sdk.store.cart.retrieve()
    if (result?.cart) return result.cart
    const created = await sdk.store.cart.create({
      region_id: DEFAULT_REGION_ID,
    })

    return created.cart
  } catch (err: any) {
    console.error("Cart fetch failed:", err?.message || err)
    return null
  }
}

export const useCart = ({ enabled = true } = {}) => {
  return useQuery({
    queryKey: ["cart"],
    enabled,
    queryFn: fetchCart,
  })
}

export const useCartQuantity = () => {
  return useQuery({
    queryKey: ["cart-quantity"],
    queryFn: async () => {
      const cart = await fetchCart()
      return cart?.items?.reduce((sum, i) => sum + i.quantity, 0) || 0
    },
  })
}
