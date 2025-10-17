"use client"

import { useState, useEffect } from "react"
import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import Addresses from "@modules/checkout/components/addresses"
import Nav from "@modules/layout/templates/nav"
import Footer from "@modules/layout/templates/footer"
import { notFound } from "next/navigation"
import CardInfo from "./card-info"
import Review from "@/modules/checkout/components/review/index"

export default function Checkout() {
  const [cart, setCart] = useState<any>(null)
  const [customer, setCustomer] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [openStep, setOpenStep] = useState<number | null>(1)

  const [addressComplete, setAddressComplete] = useState(false)
  const [cardComplete, setCardComplete] = useState(false)
  const [deliveryConfirmed, setDeliveryConfirmed] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const c = await retrieveCart()
        if (!c) return notFound()
        const cust = await retrieveCustomer()
        setCart(c)
        setCustomer(cust)
        if (cust?.addresses?.length > 0) {
          setAddressComplete(true)
        }
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
                  <Addresses
                    cart={cart}
                    customer={customer}
                    onComplete={() => setAddressComplete(true)}
                  />
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
                  <div className="flex items-center justify-between py-4 border rounded-md px-6 bg-gray-50 opacity-70">
                    <label className="flex items-center gap-3 text-sm cursor-not-allowed select-none">
                      <input
                        type="radio"
                        name="shipping_method"
                        checked
                        readOnly
                        className="accent-black"
                      />
                      <span>Delivery</span>
                    </label>
                    <span className="text-sm text-gray-500">Included</span>
                  </div>
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
                  <CardInfo onComplete={() => setCardComplete(true)} />
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
                  <Review
                    cart={cart}
                    addressComplete={addressComplete}
                    cardComplete={cardComplete}
                    deliveryConfirmed={deliveryConfirmed}
                  />
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
