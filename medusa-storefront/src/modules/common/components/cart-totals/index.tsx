"use client"

import { convertToLocale } from "@lib/util/money"

type CartTotalsProps = {
  totals: {
    total?: number | null
    subtotal?: number | null
    tax_total?: number | null
    item_subtotal?: number | null
    shipping_subtotal?: number | null
    discount_subtotal?: number | null
    currency_code: string
  }
}

const CartTotals: React.FC<CartTotalsProps> = ({ totals }) => {
  const {
    currency_code,
    total,
    tax_total,
    item_subtotal,
    shipping_subtotal,
  } = totals

  return (
    <div className="text-sm text-black space-y-2">
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>{convertToLocale({ amount: item_subtotal ?? 0, currency_code })}</span>
      </div>
      <div className="flex justify-between">
        <span>Shipping</span>
        <span>{convertToLocale({ amount: shipping_subtotal ?? 0, currency_code })}</span>
      </div>
      <div className="flex justify-between">
        <span>Taxes</span>
        <span>{convertToLocale({ amount: tax_total ?? 0, currency_code })}</span>
      </div>

      <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between items-center text-lg font-medium">
        <span>Total</span>
        <span>
          {convertToLocale({ amount: total ?? 0, currency_code })}
        </span>
      </div>
    </div>
  )
}

export default CartTotals
