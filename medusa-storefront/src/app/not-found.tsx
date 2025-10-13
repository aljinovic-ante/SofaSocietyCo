"use client"

import Link from "next/link"



export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      

      <main className="flex flex-col md:flex-row items-center justify-center flex-grow px-6 md:px-12 pt-24 pb-12">
        <div className="text-center md:text-left md:mr-12">
          <h1 className="text-6xl font-bold mb-2">404</h1>
          <h2 className="text-3xl font-semibold">Page not found</h2>
        </div>

        <div className="max-w-md mt-6 md:mt-0 text-center md:text-left">
          <p className="text-gray-600 mb-4">
            The page you are looking for doesnt exist or an error occurred. Go back, or head over to our home page.
          </p>
          <Link
            href="/"
            className="inline-block bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition"
          >
            Back to home
          </Link>
        </div>
      </main>

      
    </div>
  )
}
