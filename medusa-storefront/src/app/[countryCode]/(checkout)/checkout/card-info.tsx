"use client"

import { useState } from "react"

export default function CardInfo({ onComplete }: { onComplete?: () => void }) {
  const [form, setForm] = useState({
    card_name: "",
    card_number: "",
    expiry: "",
    cvc: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    setError("")
    setSuccess("")
  }

  const handleSubmit = () => {
    if (!form.card_name || !form.card_number || !form.expiry || !form.cvc) {
      setError("Please fill in all required fields.")
      setSuccess("")
      return
    }

    setError("")
    setSuccess("Card info accepted.")
    if (onComplete) onComplete()
  }

  return (
    <div className="border rounded-md p-6 bg-gray-50 flex flex-col gap-4">
      <div className="flex items-center gap-3 select-none cursor-not-allowed opacity-70">
        <input type="radio" checked readOnly className="accent-black" />
        <span className="text-sm font-medium">Pay by card</span>
      </div>

      <input
        type="text"
        name="card_name"
        placeholder="Name on card *"
        value={form.card_name}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
      />
      <input
        type="text"
        name="card_number"
        placeholder="Card number *"
        value={form.card_number}
        onChange={handleChange}
        maxLength={19}
        className="border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
      />
      <div className="flex gap-3">
        <input
          type="text"
          name="expiry"
          placeholder="MM/YY *"
          value={form.expiry}
          onChange={handleChange}
          maxLength={5}
          className="border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black w-1/2"
        />
        <input
          type="text"
          name="cvc"
          placeholder="CVC *"
          value={form.cvc}
          onChange={handleChange}
          maxLength={4}
          className="border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-black w-1/2"
        />
      </div>

      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      {success && <p className="text-green-600 text-sm mt-1">{success}</p>}

      <button
        type="button"
        onClick={handleSubmit}
        className="w-full h-11 bg-black text-white rounded-md text-sm font-medium hover:bg-neutral-900 transition mt-2"
      >
        Continue
      </button>
    </div>
  )
}
