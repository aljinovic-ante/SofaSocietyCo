"use client"

import { useRouter } from "next/navigation"

export default function useRefreshCart() {
  const router = useRouter()

  return () => {
    router.refresh()
  }
}
