"use client"

import { Button } from "@medusajs/ui"
import React from "react"
import { useFormStatus } from "react-dom"

export function SubmitButton({
  children,
  variant,
  className,
  "data-testid": dataTestId,
}: {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "transparent" | "danger" | null
  className?: string
  "data-testid"?: string
}) {
  const { pending } = useFormStatus()
  const finalVariant = variant ?? "transparent"
  const reset = "!border-0 !ring-0 focus:!ring-0 !outline-none focus:!outline-none !shadow-none"

  return (
    <Button
      size="large"
      className={`${reset} ${className || ""}`}
      type="submit"
      isLoading={pending}
      variant={finalVariant}
      data-testid={dataTestId}
    >
      {children}
    </Button>
  )
}
