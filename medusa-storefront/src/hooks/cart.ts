"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { sdk } from "@lib/config"

// const DEFAULT_REGION_ID = "reg_01K7P8H7TRF9E0AXS39PAGVT5H"

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
    console.log("[fetchCart] Starting fetchCart()")

    const result = await sdk.store.cart.retrieve()
    console.log("[fetchCart] Cart retrieve result:", result)

    if (result?.cart) {
      console.log("[fetchCart] Existing cart found:", result.cart.id)
      console.log("[fetchCart] Cart region:", result.cart.region_id)
      console.log("[fetchCart] Cart region details:", result.cart.region)
      return result.cart
    }

    console.log("[fetchCart] No existing cart found — fetching regions...")

    const regions = await sdk.store.region.list()
    console.log("[fetchCart] Regions list response:", regions)

    const region = regions?.regions?.[0]

    if (!region) {
      console.error("[fetchCart] No regions found in backend!")
      return null
    }

    console.log(
      `[fetchCart] Selected region: ${region.name} (${region.id}), countries:`,
      region.countries?.map((c: any) => c.display_name || c.iso_2)
    )

    console.log("[fetchCart] Creating a new cart in region:", region.id)
    const created = await sdk.store.cart.create({
      region_id: region.id,
    })

    console.log("[fetchCart] Cart created successfully:", created)
    console.log("[fetchCart] New cart ID:", created.cart?.id)
    console.log("[fetchCart] New cart region:", created.cart?.region_id)
    console.log("[fetchCart] New cart details:", created.cart)

    return created.cart
  } catch (err: any) {
    console.error("[fetchCart] Cart fetch failed:", err?.message || err)
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
