"use client"

import { create } from "zustand"
import { signup, login, signout, retrieveCustomer } from "@/lib/data/customer"
import { sdk } from "@/lib/config"

type Customer = {
  id: string
  email: string
  first_name?: string | null
  last_name?: string | null
}

type AuthState = {
  customer: Customer | null
  loading: boolean
  error: string | null
  register: (email: string, password: string) => Promise<boolean>
  login: (email: string, password: string) => Promise<boolean>
  logout: (countryCode: string) => Promise<void>
  loadCustomer: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  customer: null,
  loading: false,
  error: null,

  register: async (email, password) => {
    try {
      set({ loading: true, error: null })

      const formData = new FormData()
      formData.append("email", email)
      formData.append("password", password)

      const res = await signup(null, formData)
      if (typeof res === "string") throw new Error(res)

      await sdk.auth.login("customer", "emailpass", { email, password })

      const { customer } = await sdk.store.customer.retrieve()
      set({ customer, loading: false })
      return true
    } catch (error: any) {
      set({ error: error.message || "Registration failed", loading: false })
      return false
    }
  },

  login: async (email, password) => {
    try {
      set({ loading: true, error: null })

      await sdk.auth.login("customer", "emailpass", { email, password })

      const { customer } = await sdk.store.customer.retrieve()
      set({ customer, loading: false })
      return true
    } catch (error: any) {
      set({ error: "Invalid email or password", loading: false })
      return false
    }
  },

  logout: async (countryCode) => {
    await signout(countryCode)
    set({ customer: null })
  },

  loadCustomer: async () => {
    try {
      const { customer } = await sdk.store.customer.retrieve()
      set({ customer })
    } catch {
      set({ customer: null })
    }
  },
}))
