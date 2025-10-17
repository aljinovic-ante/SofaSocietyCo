"use client"

import { convertToLocale } from "@lib/util/money"
import React from "react"

type CartTotalsProps = {
  totals: {
    total?: number | null
    subtotal?: number | null
    tax_total?: number | null
    currency_code: string
    item_subtotal?: number | null
    shipping_subtotal?: number | null
    discount_subtotal?: number | null
  }
}

const CartTotals: React.FC<CartTotalsProps> = ({ totals }) => {
  const {
    currency_code,
    total,
    tax_total,
    item_subtotal,
    shipping_subtotal,
    discount_subtotal,
  } = totals

  return (
    <div className="text-[15px] text-gray-700">
      <div className="flex justify-between py-1">
        <span>Subtotal:</span>
        <span>
          {convertToLocale({ amount: item_subtotal ?? 0, currency_code })}
        </span>
      </div>

      <div className="flex justify-between py-1">
        <span>Shipping:</span>
        <span>
          {convertToLocale({ amount: shipping_subtotal ?? 0, currency_code })}
        </span>
      </div>

      <div className="flex justify-between py-1">
        <span>Taxes:</span>
        <span>
          {convertToLocale({ amount: tax_total ?? 0, currency_code })}
        </span>
      </div>

      <div className="border-t border-gray-200 my-3" />

      <div className="flex justify-between items-center text-xl font-semibold text-black">
        <span>Total:</span>
        <span>
          {convertToLocale({ amount: total ?? 0, currency_code })}
        </span>
      </div>
    </div>
  )
}

export default CartTotals
