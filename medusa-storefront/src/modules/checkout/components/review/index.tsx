"use client"
import { Heading, Text } from "@medusajs/ui"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { placeOrder } from "@/lib/data/cart"

export default function Review({
  cart,
  email,
  customer,
  addressComplete,
  cardComplete,
  deliveryConfirmed,
}: {
  cart: any
  email: string
  customer: any
  addressComplete: boolean
  cardComplete: boolean
  deliveryConfirmed: boolean
}) {
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const finalCardComplete =
    cardComplete || cart?.payment_collection?.payment_sessions?.some(
      (s: any) => s.provider_id === "pp_system_default"
    )

  useEffect(() => {
    setReady(
      addressComplete &&
      deliveryConfirmed &&
      finalCardComplete &&
      /\S+@\S+\.\S+/.test(email)
    )
  }, [addressComplete, deliveryConfirmed, finalCardComplete, email])

  const handlePlaceOrder = async () => {
    if (!ready || loading) return

    setLoading(true)
    setError(null)

    try {
      const orderData = await placeOrder(cart.id)

      if (orderData) {
        const countryCode = orderData.order.shipping_address?.country_code?.toLowerCase()
        router.push(`/${countryCode}/order/${orderData.order.id}/confirmed`)
      } else {
        throw new Error("Order creation failed")
      }
    } catch (err) {
      setError("An error occurred while placing the order.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white">
      <Heading level="h2" className="text-3xl font-semibold mb-4">
        Review
      </Heading>

      <div className="mb-6">
        <Text className="text-sm text-gray-700">
          Confirm all details before placing your order:
        </Text>
        <ul className="list-disc pl-6 mt-3 text-sm space-y-1">
          <li className={addressComplete ? "text-green-600" : "text-red-600"}>
            {addressComplete ? "✔ Address completed" : "✖ Address missing"}
          </li>
          <li className={deliveryConfirmed ? "text-green-600" : "text-red-600"}>
            {deliveryConfirmed ? "✔ Delivery confirmed" : "✖ Delivery missing"}
          </li>
          <li className={finalCardComplete ? "text-green-600" : "text-red-600"}>
            {finalCardComplete
              ? "✔ Payment confirmed"
              : "✖ Payment missing"}
          </li>
          <li className={/\S+@\S+\.\S+/.test(email) ? "text-green-600" : "text-red-600"}>
            {/\S+@\S+\.\S+/.test(email) ? "✔ Email valid" : "✖ Email invalid"}
          </li>
        </ul>

        {customer?.addresses?.[0] && (
          <div className="mt-4">
            <h3 className="font-semibold">Shipping Address</h3>
            <p>{customer?.addresses[0]?.line1}</p>
            <p>{customer?.addresses[0]?.city}</p>
            <p>{customer?.addresses[0]?.country}</p>
          </div>
        )}
      </div>

      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

      <button
        onClick={handlePlaceOrder}
        disabled={!ready || loading}
        className={`w-full h-11 rounded-md text-sm font-medium transition ${
          ready
            ? "bg-black text-white hover:bg-neutral-900"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
      >
        {loading ? "Placing order..." : "Place Order"}
      </button>
    </div>
  )
}
