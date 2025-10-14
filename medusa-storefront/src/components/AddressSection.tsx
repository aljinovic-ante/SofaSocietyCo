"use client"

import { useState } from "react"
import { useCustomer, useAddressMutation } from "@/hooks/customer"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export default function AddressSection() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { data: customer, isLoading } = useCustomer()
  const address = customer?.addresses?.[0] || null
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    address_1: "",
    address_2: "",
    city: "",
    postal_code: "",
    province: "",
    country_code: "",
    phone: "",
  })

  const mutation = useAddressMutation(address?.id, {
    onSuccess: async () => {
      setEditing(false)
      await queryClient.invalidateQueries({ queryKey: ["customer"] })
      router.refresh()
    },
  })

  if (isLoading)
    return <p className="text-black-500">Loading address...</p>

  const startEditing = () => {
    if (address) {
      setForm({
        address_1: address.address_1 || "",
        address_2: address.address_2 || "",
        city: address.city || "",
        postal_code: address.postal_code || "",
        province: address.province || "",
        country_code: address.country_code || "",
        phone: address.phone || "",
      })
    } else {
      setForm({
        address_1: "",
        address_2: "",
        city: "",
        postal_code: "",
        province: "",
        country_code: "",
        phone: "",
      })
    }
    setEditing(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    if (!form.address_1.trim() || !form.city.trim() || !form.postal_code.trim()) {
      alert("Address, city, and postal code cannot be empty.")
      return
    }
    mutation.mutate(form as any)
  }

  return (
    <section className="mb-10">
      <h2 className="text-lg font-medium mb-4">Address</h2>

      {!editing ? (
        address ? (
          <div className="border border-black-200 rounded-md p-4 flex justify-between items-start">
            <div>
              <p className="text-sm text-black-500 mb-1">Saved address</p>
              <p className="font-medium">{address.address_1}</p>
              {address.address_2 && <p>{address.address_2}</p>}
              <p>
                {address.city}, {address.postal_code}
              </p>
              {address.province && <p>{address.province}</p>}
              <p>{address.country_code?.toUpperCase()}</p>
              {address.phone && <p className="text-sm text-black-500 mt-1">{address.phone}</p>}
            </div>
            <button
              onClick={startEditing}
              className="border border-black-300 rounded-md px-4 py-1 text-sm hover:bg-black-100 h-fit"
            >
              Change
            </button>
          </div>
        ) : (
          <button
            onClick={startEditing}
            className="bg-black text-white rounded-md px-4 py-2 text-sm hover:opacity-90 transition"
          >
            Add address
          </button>
        )
      ) : (
        <div className="border border-black-200 rounded-md p-4 flex flex-col gap-2 w-full">
          <input
            name="address_1"
            value={form.address_1}
            onChange={handleChange}
            placeholder="Address line 1"
            className="border border-black-300 rounded-md px-3 py-2"
          />
          <input
            name="address_2"
            value={form.address_2}
            onChange={handleChange}
            placeholder="Address line 2 (optional)"
            className="border border-black-300 rounded-md px-3 py-2"
          />
          <div className="flex gap-2">
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              className="border border-black-300 rounded-md px-3 py-2 w-1/2"
            />
            <input
              name="postal_code"
              value={form.postal_code}
              onChange={handleChange}
              placeholder="Postal code"
              className="border border-black-300 rounded-md px-3 py-2 w-1/2"
            />
          </div>
          <input
            name="province"
            value={form.province}
            onChange={handleChange}
            placeholder="Province (optional)"
            className="border border-black-300 rounded-md px-3 py-2"
          />
          <input
            name="country_code"
            value={form.country_code}
            onChange={handleChange}
            placeholder="Country code (e.g. hr)"
            className="border border-black-300 rounded-md px-3 py-2"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone (optional)"
            className="border border-black-300 rounded-md px-3 py-2"
          />

          <div className="flex gap-3 mt-2">
            <button
              onClick={handleSave}
              disabled={mutation.isPending}
              className="bg-black text-white rounded-md px-4 py-2 text-sm hover:opacity-90 transition disabled:opacity-50"
            >
              {mutation.isPending ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setEditing(false)}
              className="border border-black-300 rounded-md px-4 py-2 text-sm hover:bg-black-100"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
