"use client"

import { useState, useEffect } from "react"
import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import Addresses from "@modules/checkout/components/addresses"
import Shipping from "@modules/checkout/components/shipping"
import Payment from "@modules/checkout/components/payment"
import Review from "@modules/checkout/components/review"
import Nav from "@modules/layout/templates/nav"
import Footer from "@modules/layout/templates/footer"
import { notFound } from "next/navigation"

export default function Checkout() {
  const [cart, setCart] = useState<any>(null)
  const [customer, setCustomer] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [openStep, setOpenStep] = useState<number | null>(1)

  useEffect(() => {
    async function loadData() {
      try {
        const c = await retrieveCart()
        if (!c) return notFound()
        const cust = await retrieveCustomer()
        setCart(c)
        setCustomer(cust)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-black">
        Loading checkout...
      </div>
    )

  if (!cart) return notFound()

  const toggleStep = (index: number) => {
    setOpenStep((prev) => (prev === index ? null : index))
  }

  return (
    <>
      <Nav />
      <div className="min-h-screen w-full bg-white text-black py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-0 py-16">
          <div className="flex flex-col gap-10 px-8">
            <h1 className="text-4xl font-semibold mb-2 tracking-tight">
              Checkout
            </h1>

            <section>
              <div
                onClick={() => toggleStep(1)}
                className="flex justify-between items-center cursor-pointer py-3 border-b border-gray-200"
              >
                <h2 className="font-semibold text-base">1. Email</h2>
                <span className="text-xl">{openStep === 1 ? "−" : "+"}</span>
              </div>
              {openStep === 1 && (
                <div className="space-y-4 mt-4">
                  <input
                    type="email"
                    placeholder="Email"
                    defaultValue={customer?.email ?? ""}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                  />
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <input type="checkbox" />
                    <p>
                      Want to get news and offers? Ok, yes and some discounts.
                      But only if you subscribe.
                    </p>
                  </div>
                  <button className="w-28 h-10 bg-black text-white rounded-md text-sm font-medium hover:bg-neutral-900 transition">
                    Next
                  </button>
                </div>
              )}
            </section>

            <section>
              <div
                onClick={() => toggleStep(2)}
                className="flex justify-between items-center cursor-pointer py-3 border-b border-gray-200"
              >
                <h2 className="font-semibold text-base">2. Delivery details</h2>
                <span className="text-xl">{openStep === 2 ? "−" : "+"}</span>
              </div>
              {openStep === 2 && (
                <div className="mt-4">
                  <Addresses cart={cart} customer={customer} />
                </div>
              )}
            </section>

            <section>
              <div
                onClick={() => toggleStep(3)}
                className="flex justify-between items-center cursor-pointer py-3 border-b border-gray-200"
              >
                <h2 className="font-semibold text-base">3. Shipping</h2>
                <span className="text-xl">{openStep === 3 ? "−" : "+"}</span>
              </div>
              {openStep === 3 && (
                <div className="mt-4">
                  <Shipping cart={cart} availableShippingMethods={null} />
                </div>
              )}
            </section>

            <section>
              <div
                onClick={() => toggleStep(4)}
                className="flex justify-between items-center cursor-pointer py-3 border-b border-gray-200"
              >
                <h2 className="font-semibold text-base">4. Payment</h2>
                <span className="text-xl">{openStep === 4 ? "−" : "+"}</span>
              </div>
              {openStep === 4 && (
                <div className="mt-4">
                  <Payment cart={cart} availablePaymentMethods={[]} />
                </div>
              )}
            </section>

            <section>
              <div
                onClick={() => toggleStep(5)}
                className="flex justify-between items-center cursor-pointer py-3 border-b border-gray-200"
              >
                <h2 className="font-semibold text-base">5. Review</h2>
                <span className="text-xl">{openStep === 5 ? "−" : "+"}</span>
              </div>
              {openStep === 5 && (
                <div className="mt-4">
                  <Review cart={cart} />
                  <button className="w-full h-11 bg-black text-white rounded-md text-sm font-medium hover:bg-neutral-900 transition mt-6">
                    Place an order
                  </button>
                </div>
              )}
            </section>
          </div>
          
          <div className="bg-[#f8f8f8] rounded-lg px-8 py-10 h-fit">
            <CheckoutSummary cart={cart} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
