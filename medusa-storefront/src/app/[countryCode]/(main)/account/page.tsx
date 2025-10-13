"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCustomer,signout } from "@/lib/data/customer"

export default function AccountPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    getCustomer()
      .then((customer) => {
        if (!customer) router.replace("/auth/login")
        else setUser(customer)
      })
      .finally(() => setLoading(false))
  }, [router])

  const handleLogout = async () => {
    await signout("hr")
    router.push("/auth/login")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading your profile
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white border-r border-gray-200 p-8 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-8">My account</h2>
          <nav className="flex flex-col gap-6 text-sm font-medium">
            <a href="#" className="text-black">Personal & security</a>
            <a href="#" className="text-gray-500 hover:text-black transition">My orders</a>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="text-sm text-gray-500 hover:text-black transition"
        >
          Log out
        </button>
      </aside>

      <main className="flex-1 bg-white p-16 pt-24">
        <h1 className="text-2xl font-semibold mb-8">Personal & security</h1>

        <section className="mb-10">
          <h2 className="text-lg font-medium mb-4">Personal information</h2>
          <div className="border border-gray-200 rounded-md p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{user?.first_name} {user?.last_name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Number</p>
              <p className="font-medium">+385 99 143 321</p>
            </div>
            <button className="border border-gray-300 rounded-md px-4 py-1 text-sm hover:bg-gray-100">
              Change
            </button>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-lg font-medium mb-4">Contact</h2>
          <div className="border border-gray-200 rounded-md p-4">
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{user?.email}</p>
            <p className="text-xs text-gray-400 mt-2">
              If you want to change your email please contact our customer support.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-lg font-medium mb-4">Address</h2>
          {user?.addresses?.length ? (
            user.addresses.map((addr: any) => (
              <div key={addr.id} className="border border-gray-200 rounded-md p-4 mb-4">
                <p className="font-medium">{addr.first_name} {addr.last_name}</p>
                <p>{addr.address_1}</p>
                <p>{addr.city}, {addr.postal_code}</p>
                <p>{addr.country_code.toUpperCase()}</p>
                <p className="text-sm text-gray-500">{addr.phone}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 mb-4">No addresses saved.</p>
          )}
          <button className="bg-black text-white rounded-md px-4 py-2 text-sm hover:opacity-90 transition">
            Add address
          </button>
        </section>

        <section>
          <h2 className="text-lg font-medium mb-4">Change password</h2>
          <p className="text-sm text-gray-500 mb-3">
            To change your password, we'll send you an email. Just click on the reset button below.
          </p>
          <button className="bg-black text-white rounded-md px-4 py-2 text-sm hover:opacity-90 transition">
            Reset password
          </button>
        </section>
      </main>
    </div>
  )
}
