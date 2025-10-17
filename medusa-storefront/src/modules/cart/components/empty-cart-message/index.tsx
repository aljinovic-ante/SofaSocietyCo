"use client"

import Link from "next/link"

export default function EmptyCartMessage() {
  return (
    <div className="flex flex-col min-h-[60vh] bg-white text-black">
      <main className="flex flex-col md:flex-row items-center justify-center flex-grow px-6 md:px-12 pt-24 pb-12">
        <div className="text-center md:text-left md:mr-12">
          <h1 className="text-6xl font-bold mb-2">Your cart is empty</h1>
          <h2 className="text-3xl font-semibold">Let’s change that!</h2>
        </div>

        <div className="max-w-md mt-6 md:mt-0 text-center md:text-left">
          <p className="text-gray-600 mb-4">
            You don’t have anything in your cart yet. Browse our collection and
            find something you love.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-black text-white px-5 py-3 rounded-md text-base font-medium hover:bg-neutral-800 transition"
          >
            Explore products
          </Link>
        </div>
      </main>
    </div>
  )
}
