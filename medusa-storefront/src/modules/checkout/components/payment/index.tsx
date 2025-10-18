"use client"

import { useState, useEffect, useCallback } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Button, Text } from "@medusajs/ui"
import { initiatePaymentSession } from "@lib/data/cart"
import ErrorMessage from "@modules/checkout/components/error-message"
import Divider from "@modules/common/components/divider"

export default function Payment({ cart }: { cart: any }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedPaymentMethod] = useState("pp_system_default")

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "payment"
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (s: any) => s.status === "pending"
  )
  const paymentReady = cart?.shipping_methods?.length > 0

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const checkActiveSession =
        activeSession?.provider_id === selectedPaymentMethod

      if (!checkActiveSession) {
        await initiatePaymentSession(cart, { provider_id: selectedPaymentMethod })
      }

      router.push(pathname + "?" + createQueryString("step", "review"), {
        scroll: false,
      })
    } catch (err: any) {
      setError(err.message || "Failed to create payment session.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  return (
    <div className="bg-white">
      {isOpen ? (
        <div className="flex flex-col space-y-6">
          <h2 className="text-xl font-semibold">Payment</h2>
          {paymentReady ? (
            <>
              <Text className="font-medium text-gray-800">
                Pay on Delivery
              </Text>

              <ErrorMessage error={error} />

              <Button
                size="large"
                className="mt-2 w-fit"
                onClick={handleSubmit}
                isLoading={isLoading}
              >
                Continue to Review
              </Button>
            </>
          ) : (
            <Text className="text-gray-500 mt-2">
              Please select a shipping method first.
            </Text>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Payment</h2>
          <div className="flex flex-col mt-2">
            <Text className="text-sm text-gray-500">Payment Method</Text>
            <Text className="text-base text-gray-800">Cash on Delivery</Text>
          </div>
        </div>
      )}

      <Divider className="mt-8" />
    </div>
  )
}
