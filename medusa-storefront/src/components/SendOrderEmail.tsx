"use client"

import { useEffect } from "react"

export default function SendOrderEmail({ order, customer }: any) {
  useEffect(() => {
    if (!order || !customer) return

    console.log("Sending order confirmation email for:", order.display_id)

    fetch("/api/send-order-confirmation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order, customer }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) console.log("Order confirmation email sent!")
        else console.error("Failed to send order email:", data.message)
      })
      .catch((err) => console.error("Email request failed:", err))
  }, [order, customer])

  return null
}
