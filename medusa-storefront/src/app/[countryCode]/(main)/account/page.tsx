"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import PersonalInfoSection from "@/components/PersonalInfoSection"
import AddressSection from "@/components/AddressSection"
import ChangePasswordSection from "@/components/ChangePass"
import { retrieveCustomer } from "@/lib/data/customer"
import { listOrdersAcc } from "@/lib/data/orders"
import { useSignout } from "@/hooks/customer"

export default function AccountPage() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState<"account" | "orders">("account")
  const [orders, setOrders] = useState<any[]>([])
  const [loadingOrders, setLoadingOrders] = useState(false)
  const [customer, setCustomer] = useState<any>(null)
  const { mutate: signout, isPending: signingOut } = useSignout()

  useEffect(() => {
    const loadCustomer = async () => {
      const c = await retrieveCustomer()
      if (!c) {
        router.push("/auth/login")
      } else {
        setCustomer(c)
      }
    }
    loadCustomer()
  }, [router])

  const handleLogout = () => {
    signout("hr", {
      onSuccess: () => {
        router.push("/auth/login")
        router.refresh()
      },
    })
  }

  const loadOrders = async () => {
    setLoadingOrders(true)
    try {
      const data = await listOrdersAcc()
      console.log("Fetched orders:", data)
      setOrders(data || [])
    } catch (err) {
      console.error('Failed to load orders:', err)
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
          disabled={signingOut}
          className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition disabled:opacity-50"
        >
          {signingOut ? "Logging out..." : "Log out"}
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
                    <div className="flex flex-col w-full">
                      <a
                        href={`http://localhost:8000/hr/order/${order.id}/confirmed`}
                        className="font-medium text-sm hover:underline"
                      >
                        Order #{order.display_id}
                      </a>
                      <p className="text-xs text-gray-500">
                        Order date: {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-2">
                        {order.items.map((item: any, index: number) => {
                          if (index < 4) {
                            const imageUrl = item.product?.thumbnail || "/placeholder.jpg";
                            return (
                              <a key={item.id} href={`http://localhost:8000/hr/order/${order.id}/confirmed`}  className="relative w-16 h-16">
                                <img
                                  src={imageUrl}
                                  alt={item.product?.handle}
                                  className="w-full h-full object-cover rounded-md"
                                />
                              </a>
                            );
                          }
                        })}
                        {order.items.length > 4 && (
                          <div className="w-16 h-16 bg-gray-300 rounded-md flex items-center justify-center text-xs text-white">
                            +{order.items.length - 4}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">
                          {(order.total).toFixed(2)}€
                        </p>
                      </div>
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
