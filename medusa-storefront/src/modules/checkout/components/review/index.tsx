"use client"

import { Heading, Text } from "@medusajs/ui"

export default function Review({
  cart,
  addressComplete,
  cardComplete,
  deliveryConfirmed,
}: {
  cart: any
  addressComplete: boolean
  cardComplete: boolean
  deliveryConfirmed: boolean
}) {
  const ready = addressComplete && cardComplete && deliveryConfirmed

  return (
    <div className="bg-white">
      <Heading level="h2" className="text-3xl font-semibold mb-4">
        Review
      </Heading>

      <div className="mb-6">
        <Text className="text-sm text-gray-700">
          Confirm your details before placing your order:
        </Text>
        <ul className="list-disc pl-6 mt-3 text-sm space-y-1">
          <li className={addressComplete ? "text-green-600" : "text-red-600"}>
            {addressComplete ? "✔ Address completed" : "✖ Address missing"}
          </li>
          <li className={deliveryConfirmed ? "text-green-600" : "text-red-600"}>
            {deliveryConfirmed ? "✔ Delivery confirmed" : "✖ Delivery missing"}
          </li>
          <li className={cardComplete ? "text-green-600" : "text-red-600"}>
            {cardComplete ? "✔ Card info completed" : "✖ Card info missing"}
          </li>
        </ul>
      </div>

      <button
        disabled={!ready}
        className={`w-full h-11 rounded-md text-sm font-medium transition ${
          ready
            ? "bg-black text-white hover:bg-neutral-900"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
      >
        Place Order
      </button>
    </div>
  )
}
