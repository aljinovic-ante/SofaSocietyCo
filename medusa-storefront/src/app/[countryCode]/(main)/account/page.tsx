"use client"
import PersonalInfoSection from "@/components/PersonalInfoSection"
import AddressSection from "@/components/AddressSection"
import ChangePasswordSection from "@/components/ChangePass"
import { getCustomer,signout } from "@/lib/data/customer"
import { useRouter } from "next/navigation"

export default function AccountPage() {
  const router = useRouter()  
  const handleLogout = async () => {
      await signout("hr")
      router.push("/auth/login")
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
        <PersonalInfoSection />
        <AddressSection />
        <ChangePasswordSection />
      </main>
    </div>
  )
}
