"use client"

import { useQuery } from "@tanstack/react-query"
import { sdk } from "@lib/config"

const DEFAULT_REGION_ID = "reg_01K7P8H7TRF9E0AXS39PAGVT5H"

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
