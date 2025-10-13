"use client"

export default function ChangePasswordSection() {
  return (
    <section className="mb-10">
      <h2 className="text-lg font-medium mb-4">Change password</h2>
      <p className="text-sm text-gray-500 mb-3">
        To change your password, we'll send you an email. Just click on the reset button below.
      </p>
      <button className="bg-black text-white rounded-md px-4 py-2 text-sm hover:opacity-90 transition">
        Reset password
      </button>
    </section>
  )
}
