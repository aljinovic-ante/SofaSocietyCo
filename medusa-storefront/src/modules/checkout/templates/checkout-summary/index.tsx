import { Heading, Text } from "@medusajs/ui"
import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import Link from "next/link"

const CheckoutSummary = ({ cart }: { cart: any }) => {
  return (
    <div className="sticky top-10 flex flex-col bg-[#f8f8f8] px-8 py-10 rounded-lg">
      <div className="flex items-center justify-between mb-8">
        <Text className="text-sm font-medium text-gray-800">
          Order – {cart?.items?.length || 0}{" "}
          {cart?.items?.length === 1 ? "item" : "items"}
        </Text>
        <Link
          href="/cart"
          className="text-sm text-black underline hover:opacity-70 transition"
        >
          Edit cart
        </Link>
      </div>

      <div className="mb-6">
        <ItemsPreviewTemplate cart={cart} />
      </div>

      <div className="mt-6">
        <DiscountCode cart={cart} />
      </div>

      <div className="mt-6">
        <CartTotals totals={cart} />
      </div>
    </div>
  )
}

export default CheckoutSummary
