import { useState, useMemo } from "react"
import { Button, Text } from "@medusajs/ui"
import { CardElement } from "@stripe/react-stripe-js"
import { StripeCardElementOptions } from "@stripe/stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { twJoin } from "tailwind-merge"
import { initiatePaymentSession } from "@lib/data/cart"
import Divider from "@/modules/common/components/divider"
import ErrorMessage from "../error-message"

const stripePromise = loadStripe("pk_test_51SJZ6dJE2acDtbYPqENkqm7erGcHCrqTwCGiPid4Uh0YG3oJhRrCvuNS4DEV1pynr9RQlzPjZkmqErgdTUtn4aj200RMFSfpDR")

export type PaymentProps = {
  cart: any
  onCardComplete: (complete: boolean) => void
}

export default function Payment({ cart, onCardComplete }: PaymentProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cardBrand, setCardBrand] = useState<string | null>(null)
  const [cardComplete, setCardComplete] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("pp_system_default")

  const useOptions: StripeCardElementOptions = useMemo(
    () => ({
      style: {
        base: {
          fontFamily: "Inter, sans-serif",
          color: "#050505",
          "::placeholder": { color: "#808080" },
          fontSize: "16px",
        },
      },
      classes: {
        base: "pt-[18px] pb-1 block w-full h-14.5 px-4 mt-0 border rounded-xs appearance-none focus:outline-none focus:ring-0 border-grayscale-200 hover:border-grayscale-500 focus:border-grayscale-500 transition-all ease-in-out",
      },
    }),
    []
  )

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const activeSession = cart.payment_collection?.payment_sessions?.find(
        (s: any) => s.status === "pending"
      )

      if (!activeSession) {
        await initiatePaymentSession(cart, { provider_id: selectedPaymentMethod })
      }
    } catch (err: any) {
      setError(err.message || "Failed to create payment session.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCardChange = (e: any) => {
    setCardBrand(e.brand && e.brand.charAt(0).toUpperCase() + e.brand.slice(1))
    setError(e.error?.message || null)
    setCardComplete(e.complete)
    onCardComplete(e.complete)
  }

  const paymentReady = cart?.shipping_methods?.length > 0

  return (
    <Elements stripe={stripePromise}>
      <div className="bg-white">
        <div className="mt-4">
          {paymentReady ? (
            <>
              <Text className="font-medium text-gray-800">Pay on Delivery</Text>
              <ErrorMessage error={error} />

              <div className="flex flex-col mt-5">
                <Text className="text-sm text-gray-500">Payment Method</Text>
                <Text className="text-base text-gray-800">Credit Card</Text>

                <CardElement options={useOptions} onChange={handleCardChange} />

                <Button
                  size="large"
                  className="mt-2 w-fit"
                  onClick={handleSubmit}
                  isLoading={isLoading}
                  disabled={!cardComplete}
                >
                  Continue to Review
                </Button>
              </div>
            </>
          ) : (
            <Text className="text-gray-500 mt-2">
              Please select a shipping method first.
            </Text>
          )}
        </div>

        <Divider className="mt-8" />
      </div>
    </Elements>
  )
}
