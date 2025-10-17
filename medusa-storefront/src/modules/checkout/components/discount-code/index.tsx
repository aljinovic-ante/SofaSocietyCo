"use client"

import { Badge, Heading, Input, Label, Text } from "@medusajs/ui"
import React, { useState } from "react"

import { applyPromotions } from "@lib/data/cart"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import Trash from "@modules/common/icons/trash"
import ErrorMessage from "../error-message"
import { SubmitButton } from "../submit-button"

type DiscountCodeProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

const DiscountCode: React.FC<DiscountCodeProps> = ({ cart }) => {
  const [isOpen, setIsOpen] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")
  const [inputValue, setInputValue] = useState("")

  const { promotions = [] } = cart

  const removePromotionCode = async (code: string) => {
    const validPromotions = promotions.filter(
      (promotion) => promotion.code !== code
    )

    await applyPromotions(
      validPromotions.filter((p) => p.code !== undefined).map((p) => p.code!)
    )
  }

  const addPromotionCode = async (formData: FormData) => {
    setErrorMessage("")
    const code = formData.get("code")
    if (!code) return

    const input = document.getElementById("promotion-input") as HTMLInputElement
    const codes = promotions
      .filter((p) => p.code !== undefined)
      .map((p) => p.code!)
    codes.push(code.toString())

    try {
      await applyPromotions(codes)
    } catch (e: any) {
      setErrorMessage(e.message)
    }

    if (input) {
      input.value = ""
      setInputValue("")
    }
  }

  return (
    <div className="w-full flex flex-col">
      <form action={(a) => addPromotionCode(a)} className="w-full mb-5">
        {isOpen && (
          <>
            <div className="flex w-full gap-x-2">
              <Input
                className="flex-1 h-12 text-base border border-black rounded-md px-4"
                id="promotion-input"
                name="code"
                type="text"
                placeholder="Discount code"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                data-testid="discount-input"
              />
              <SubmitButton
                className={`h-12 px-6 text-base font-medium text-white rounded-md transition border-none outline-none focus:ring-0 ${
                  inputValue.trim()
                    ? "bg-black hover:bg-neutral-900"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                data-testid="discount-apply-button"
              >
                Apply
              </SubmitButton>
            </div>

            <ErrorMessage
              error={errorMessage}
              data-testid="discount-error-message"
            />
          </>
        )}
      </form>

      {promotions.length > 0 && (
        <div className="flex flex-col w-full">
          <Heading className="txt-medium mb-2 text-base font-semibold">
            Promotion(s) applied:
          </Heading>

          {promotions.map((promotion) => (
            <div
              key={promotion.id}
              className="flex items-center justify-between w-full mb-2"
              data-testid="discount-row"
            >
              <Text className="flex gap-x-1 items-baseline text-sm w-4/5 pr-1">
                <span className="truncate" data-testid="discount-code">
                  <Badge
                    color={promotion.is_automatic ? "green" : "grey"}
                    size="small"
                  >
                    {promotion.code}
                  </Badge>{" "}
                  (
                  {promotion.application_method?.value !== undefined &&
                    promotion.application_method.currency_code !== undefined && (
                      <>
                        {promotion.application_method.type === "percentage"
                          ? `${promotion.application_method.value}%`
                          : convertToLocale({
                              amount: +promotion.application_method.value,
                              currency_code:
                                promotion.application_method.currency_code,
                            })}
                      </>
                    )}
                  )
                </span>
              </Text>
              {!promotion.is_automatic && (
                <button
                  className="flex items-center"
                  onClick={() => promotion.code && removePromotionCode(promotion.code)}
                  data-testid="remove-discount-button"
                >
                  <Trash size={14} />
                  <span className="sr-only">Remove discount code</span>
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DiscountCode
