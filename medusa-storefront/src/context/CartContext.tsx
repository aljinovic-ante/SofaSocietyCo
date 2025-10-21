"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { retrieveCart } from "@lib/data/cart"

type CartContextType = {
  cart: any
  loading: boolean
  refreshCart: () => Promise<void>
  setCart: (c: any) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const loadCart = async () => {
    setLoading(true)
    try {
      const c = await retrieveCart()
      setCart(c)
    } catch (err) {
      console.error("Failed to load cart:", err)
      setCart(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCart()
  }, [])

  return (
    <CartContext.Provider value={{ cart, loading, refreshCart: loadCart, setCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used inside CartProvider")
  return ctx
}
