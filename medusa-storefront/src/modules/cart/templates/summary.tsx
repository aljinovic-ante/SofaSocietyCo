"use client"

import { Button } from "@medusajs/ui"
import CartTotals from "@modules/common/components/cart-totals"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type SummaryProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)

  return (
    <div className="flex flex-col gap-y-6 p-6">
      <CartTotals totals={cart} />

      <DiscountCode cart={cart} />

      <LocalizedClientLink
        href={"/checkout?step=" + step}
        data-testid="checkout-button"
      >
        <Button className="w-full h-12 text-base font-medium bg-black text-white hover:bg-neutral-900 rounded-md shadow-sm">
          Proceed to checkout
        </Button>
      </LocalizedClientLink>

      <div className="bg-gray-100 text-gray-700 text-sm rounded-md py-3 px-4 mt-2 text-center">
        <span>
          Already have an account? No worries, just{" "}
          <a href="/account" className="underline font-medium text-black">
            log in.
          </a>
        </span>
      </div>
    </div>
  )
}

export default Summary
