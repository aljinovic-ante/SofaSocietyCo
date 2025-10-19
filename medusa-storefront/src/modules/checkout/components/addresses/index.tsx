"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Heading } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import { sdk } from "@lib/config"
import { retrieveCustomer } from "@lib/data/customer"

type AddressesProps = {
  cart: any
  customer: any
  onComplete?: () => void
}

export default function Addresses({ cart, customer, onComplete }: AddressesProps) {
  const router = useRouter()

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    address_1: "",
    address_2: "",
    city: "",
    postal_code: "",
    province: "",
    phone: "",
  })
  const [error, setError] = useState("")
  const [invalidFields, setInvalidFields] = useState<string[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [loadingCustomer, setLoadingCustomer] = useState(true)

  useEffect(() => {
    console.log("Addresses component mounted. Loading customer...")
    async function loadCustomer() {
      try {
        const cust = customer || (await retrieveCustomer())
        console.log("Customer loaded:", cust)
        const address = cust?.addresses?.[0]
        console.log("Using address:", address)

        setForm({
          first_name: cust?.first_name || "",
          last_name: cust?.last_name || "",
          address_1: address?.address_1 || "",
          address_2: address?.address_2 || "",
          city: address?.city || "",
          postal_code: address?.postal_code || "",
          province: address?.province || "",
          phone: address?.phone || "",
        })
      } catch (e) {
        console.error("Error loading customer:", e)
      } finally {
        setLoadingCustomer(false)
        console.log("Finished loading customer data.")
      }
    }
    loadCustomer()
  }, [customer])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError("")
    setInvalidFields((prev) => prev.filter((f) => f !== name))
  }

  const handleSave = async () => {
    console.group("handleSave triggered")
    console.log("Current cart:", cart)
    console.log("Current form:", form)

    const requiredFields = [
      "first_name",
      "last_name",
      "address_1",
      "city",
      "postal_code",
      "province",
      "phone",
    ]
    const missing = requiredFields.filter((field) => !form[field as keyof typeof form]?.trim())

    if (missing.length > 0) {
      console.warn("Missing required fields:", missing)
      setError("Not all required fields are filled.")
      setInvalidFields(missing)
      console.groupEnd()
      return
    }

    setIsSaving(true)
    setError("")

    try {
      const normalizedForm = {
        ...form,
        country_code: "hr",
      }

      console.log("Sending request to update cart:", cart?.id)
      const res = await sdk.store.cart.update(cart.id, {
        shipping_address: normalizedForm,
        billing_address: normalizedForm,
      })
      console.log("Cart update response:", res)

      if (onComplete) {
        console.log("onComplete callback triggered.")
        onComplete()
      }

      router.refresh()
      console.log("Router refreshed.")
    } catch (err: any) {
      console.group("Error in handleSave")
      console.error("Full error object:", err)

      if (err?.response) {
        console.error("Response status:", err.response.status)
        try {
          const data = await err.response.json()
          console.error("Response data:", data)
        } catch {
          console.error("Response body not JSON.")
        }
      } else if (err?.message) {
        console.error("Error message:", err.message)
      }

      console.groupEnd()
      setError("Failed to save address. Please try again.")
    } finally {
      console.log("handleSave finished.")
      setIsSaving(false)
      console.groupEnd()
    }
  }

  const inputClass = (name: string) =>
    `border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 transition ${
      invalidFields.includes(name)
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:ring-black"
    }`

  if (loadingCustomer) {
    console.log("Still loading customer...")
    return <p className="text-gray-600 text-sm">Loading address data...</p>
  }

  console.log("Rendering address form with data:", form)

  return (
    <section className="bg-white">
      <Heading level="h2" className="text-base font-semibold mb-6">
        Address
      </Heading>

      <div className="border border-gray-200 rounded-md p-6 flex flex-col gap-3 w-full">
        <div className="flex gap-3">
          <input
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            placeholder="First name *"
            className={`${inputClass("first_name")} w-1/2`}
          />
          <input
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            placeholder="Last name *"
            className={`${inputClass("last_name")} w-1/2`}
          />
        </div>
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
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone *"
          className={inputClass("phone")}
        />

        <input type="hidden" name="country_code" value="hr" />

        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-40 h-10 bg-black text-white rounded-md text-sm font-medium hover:bg-neutral-900 transition disabled:opacity-70 mt-3"
        >
          {isSaving ? "Saving..." : "Save and continue"}
        </button>
      </div>

      <Divider className="mt-8" />
    </section>
  )
}
