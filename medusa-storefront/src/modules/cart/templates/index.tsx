"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import Divider from "@modules/common/components/divider"
import { HttpTypes } from "@medusajs/types"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const router = useRouter()

  // useEffect(() => {
  //   if (!customer) {
  //     router.push("/auth/login")
  //   }
  // }, [customer, router])
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-8" data-testid="cart-container">
        {cart?.items?.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-20 py-20">
            <div>
              {!customer && (
                <div className="mb-6">
                  <Divider />
                </div>
              )}
              <ItemsTemplate cart={cart} />
            </div>
            <div className="sticky top-10 self-start">
              {cart && cart.region && (
                <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
                  <Summary cart={cart as any} />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="py-20">
            <EmptyCartMessage />
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate
