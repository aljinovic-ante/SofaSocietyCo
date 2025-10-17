"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import PersonalInfoSection from "@/components/PersonalInfoSection"
import AddressSection from "@/components/AddressSection"
import ChangePasswordSection from "@/components/ChangePass"
import { retrieveCustomer, signout } from "@/lib/data/customer"
import { listOrders } from "@/lib/data/orders"

export default function AccountPage() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState<"account" | "orders">("account")
  const [orders, setOrders] = useState<any[]>([])
  const [loadingOrders, setLoadingOrders] = useState(false)
  const [customer, setCustomer] = useState<any>(null)

  useEffect(() => {
    const loadCustomer = async () => {
      const c = await retrieveCustomer()
      setCustomer(c)
    }
    loadCustomer()
  }, [])

  const handleLogout = async () => {
    await signout("hr")
    router.push("/auth/login")
  }

  const loadOrders = async () => {
    setLoadingOrders(true)
    try {
      const data = await listOrders()
      setOrders(data)
    } finally {
      setLoadingOrders(false)
    }
  }

  useEffect(() => {
    if (activeSection === "orders") {
      loadOrders()
    }
  }, [activeSection])

  return (
    <div className="min-h-screen bg-black-50 flex py-20">
      <aside className="w-64 bg-white border-r border-black-200 p-8 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-8">My account</h2>
          <nav className="flex flex-col gap-6 text-sm font-medium">
            <button
              onClick={() => setActiveSection("account")}
              className={`text-left transition ${
                activeSection === "account"
                  ? "text-black font-semibold"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              Personal & security
            </button>
            <button
              onClick={() => setActiveSection("orders")}
              className={`text-left transition ${
                activeSection === "orders"
                  ? "text-black font-semibold"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              My orders
            </button>
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
        {activeSection === "account" && (
          <>
            <h1 className="text-2xl font-semibold mb-8">Personal & security</h1>
            <PersonalInfoSection />
            <AddressSection />
            <ChangePasswordSection />
          </>
        )}

        {activeSection === "orders" && (
          <>
            <h1 className="text-2xl font-semibold mb-8">My Orders</h1>
            {loadingOrders ? (
              <p className="text-gray-500">Loading your orders...</p>
            ) : orders.length === 0 ? (
              <p className="text-gray-500">You have no previous orders.</p>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-gray-200 rounded-lg p-6 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium text-sm">Order #{order.display_id}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(order.created_at).toLocaleDateString()} –{" "}
                        {order.items.length} item
                        {order.items.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">
                        {(order.total / 100).toFixed(2)} {order.currency_code.toUpperCase()}
                      </p>
                      <p className="text-xs text-gray-500">{order.fulfillment_status}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
