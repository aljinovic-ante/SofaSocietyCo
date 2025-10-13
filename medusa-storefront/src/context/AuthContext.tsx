"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { sdk } from "@/lib/config"

type User = {
  id: string
  email: string
  first_name?: string
  last_name?: string
} | null

interface AuthContextType {
  user: User
  loading: boolean
  refreshUser: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [loading, setLoading] = useState(true)

  async function refreshUser() {
    try {
      const { customer } = await sdk.store.customer.retrieve()
      setUser(customer)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  async function logout() {
    await sdk.auth.logout()
    setUser(null)
  }

  useEffect(() => {
    refreshUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside an AuthProvider")
  return ctx
}
