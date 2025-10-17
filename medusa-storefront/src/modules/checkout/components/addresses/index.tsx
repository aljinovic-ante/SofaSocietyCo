"use client"

import { useState, useEffect } from "react"
import { useCustomer, useAddressMutation } from "@/hooks/customer"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { Heading } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"

type AddressesProps = {
  cart: any
  customer: any
}

export default function Addresses({ cart, customer }: AddressesProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { data: customerData, isLoading } = useCustomer()
  const address = customerData?.addresses?.[0] || null

  const [form, setForm] = useState({
    address_1: "",
    address_2: "",
    city: "",
    postal_code: "",
    province: "",
    country_code: "hr",
    phone: "",
  })
  const [error, setError] = useState("")
  const [invalidFields, setInvalidFields] = useState<string[]>([])

  useEffect(() => {
    if (address) {
      setForm({
        address_1: address.address_1 || "",
        address_2: address.address_2 || "",
        city: address.city || "",
        postal_code: address.postal_code || "",
        province: address.province || "",
        country_code: address.country_code || "hr",
        phone: address.phone || "",
      })
    }
  }, [address])

  const mutation = useAddressMutation(address?.id, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["customer"] })
      router.refresh()
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError("")
    setInvalidFields((prev) => prev.filter((f) => f !== name))
  }

  const handleSave = () => {
    const requiredFields = ["address_1", "city", "postal_code", "province", "phone"]
    const missing = requiredFields.filter((field) => !form[field as keyof typeof form]?.trim())

    if (missing.length > 0) {
      setError("Not all required fields are filled.")
      setInvalidFields(missing)
      return
    }

    setError("")
    mutation.mutate(form as any)
  }

  if (isLoading) return <p className="text-gray-600 text-sm">Loading address...</p>

  const inputClass = (name: string) =>
    `border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 transition ${
      invalidFields.includes(name)
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:ring-black"
    }`

  return (
    <section className="bg-white">
      <Heading level="h2" className="text-base font-semibold mb-6">
        Address
      </Heading>

      <div className="border border-gray-200 rounded-md p-6 flex flex-col gap-3 w-full">
        <input
          name="address_1"
          value={form.address_1}
          onChange={handleChange}
          placeholder="Address line 1 *"
          className={inputClass("address_1")}
        />
        <input
          name="address_2"
          value={form.address_2}
          onChange={handleChange}
          placeholder="Address line 2 (optional)"
          className={inputClass("address_2")}
        />
        <div className="flex gap-3">
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City *"
            className={`${inputClass("city")} w-2/3`}
          />
          <input
            name="postal_code"
            value={form.postal_code}
            onChange={handleChange}
            placeholder="Postal code *"
            className={`${inputClass("postal_code")} w-1/3`}
          />
        </div>
        <input
          name="province"
          value={form.province}
          onChange={handleChange}
          placeholder="Province *"
          className={inputClass("province")}
        />
        <input
          name="country_code"
          value={form.country_code}
          onChange={handleChange}
          placeholder="Country code (e.g. hr)"
          className={inputClass("country_code")}
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone *"
          className={inputClass("phone")}
        />

        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}

        <button
          onClick={handleSave}
          disabled={mutation.isPending}
          className="w-40 h-10 bg-black text-white rounded-md text-sm font-medium hover:bg-neutral-900 transition disabled:opacity-70 mt-3"
        >
          {mutation.isPending ? "Saving..." : "Save and continue"}
        </button>
      </div>

      <Divider className="mt-8" />
    </section>
  )
}
