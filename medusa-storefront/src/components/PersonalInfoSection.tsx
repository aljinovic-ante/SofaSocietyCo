"use client"

import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useCustomer, useUpdateCustomer } from "@/hooks/customer"

export default function PersonalInfoSection() {
  const { data: customer, isLoading } = useCustomer()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
  })

  const router = useRouter()
  const queryClient = useQueryClient()
  const updateCustomer = useUpdateCustomer({
    onSuccess: async () => {
      setEditing(false)
      await queryClient.invalidateQueries({ queryKey: ["customer"] })
      router.refresh()
    },
  })

  if (isLoading)
    return <p className="text-gray-500">Loading personal info...</p>

  const startEditing = () => {
    setForm({
      first_name: customer?.first_name || "",
      last_name: customer?.last_name || "",
      phone: customer?.phone || "",
    })
    setEditing(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    if (!form.first_name.trim() || !form.last_name.trim()) {
      alert("Name and surname cannot be empty.")
      return
    }
    updateCustomer.mutate(form)
  }

  return (
    <section className="mb-10">
      <h2 className="text-lg font-medium mb-4">Personal information</h2>

      <div className="border border-gray-200 rounded-md p-4 flex justify-between items-center">
        {!editing ? (
          <>
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">
                {customer?.first_name} {customer?.last_name}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Number</p>
              <p className="font-medium">{customer?.phone || "—"}</p>
            </div>
            <button
              onClick={startEditing}
              className="border border-gray-300 rounded-md px-4 py-1 text-sm hover:bg-gray-100"
            >
              Change
            </button>
          </>
        ) : (
          <div className="flex flex-col gap-2 w-full">
            <div className="flex gap-2">
              <input
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                placeholder="First name"
                className="border border-gray-300 rounded-md px-3 py-2 w-1/2"
              />
              <input
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                placeholder="Last name"
                className="border border-gray-300 rounded-md px-3 py-2 w-1/2"
              />
            </div>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone number"
              className="border border-gray-300 rounded-md px-3 py-2"
            />

            <div className="flex gap-3 mt-2">
              <button
                onClick={handleSave}
                disabled={updateCustomer.isPending}
                className="bg-black text-white rounded-md px-4 py-2 text-sm hover:opacity-90 transition disabled:opacity-50"
              >
                {updateCustomer.isPending ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setEditing(false)}
                className="border border-gray-300 rounded-md px-4 py-2 text-sm hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
