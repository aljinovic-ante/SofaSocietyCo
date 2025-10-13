"use client"
import Link from "next/link"

export default function HomePage() {
  return (
    <main className="bg-white text-gray-900">
      <section>
        <div className="bg-gray-200 h-[700px] flex items-center justify-center">
          <span className="text-gray-500">Image Placeholder</span>
        </div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8 px-6 md:px-12 py-16">
          <h2 className="text-3xl md:text-4xl font-semibold leading-snug md:w-1/2">
            Elevate Your Living Space with Unmatched Comfort & Style
          </h2>
          <div className="text-sm md:text-base md:w-1/2 flex flex-col items-start md:items-end">
            <p className="text-gray-600">Discover Your Perfect Sofa Today</p>
             <Link
                href="/shop"
                className="underline underline-offset-2 mt-1 hover:text-gray-800"
                >
                Explore Now
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-10">Our products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col items-center">
            <div className="bg-gray-200 h-[400px] w-full flex items-center justify-center">
              <span className="text-gray-500">Image Placeholder</span>
            </div>
            <p className="mt-4 text-sm font-medium">Sofas</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-gray-200 h-[400px] w-full flex items-center justify-center">
              <span className="text-gray-500">Image Placeholder</span>
            </div>
            <p className="mt-4 text-sm font-medium">Arm Chairs</p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold">Collections</h2>
          <div className="flex items-center gap-3">
            {/* this has to be links to collections and products, view all go to shop?? */}
            <button className="text-xs bg-black text-white px-4 py-2 rounded">View All</button>
            <div className="flex gap-2">
              <button className="border rounded-full w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black">←</button>
              <button className="border rounded-full w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black">→</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="bg-gray-200 h-[400px] flex items-center justify-center">
              <span className="text-gray-500">Image Placeholder</span>
            </div>
            <h3 className="mt-4 font-medium text-lg">Scandinavian Simplicity</h3>
            <p className="text-sm text-gray-600 mt-1">
              Minimalistic designs, neutral colors, and high-quality textures
            </p>
          </div>

          <div>
            <div className="bg-gray-200 h-[400px] flex items-center justify-center">
              <span className="text-gray-500">Image Placeholder</span>
            </div>
            <h3 className="mt-4 font-medium text-lg">Modern Luxe</h3>
            <p className="text-sm text-gray-600 mt-1">
              Sophisticated and sleek, these sofas blend modern design with luxurious comfort
            </p>
          </div>

          <div>
            <div className="bg-gray-200 h-[400px] flex items-center justify-center">
              <span className="text-gray-500">Image Placeholder</span>
            </div>
            <h3 className="mt-4 font-medium text-lg">Boho Chic</h3>
            <p className="text-sm text-gray-600 mt-1">
              Infused with playful textures and patterns with eclectic vibes
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-10">About Sofa Society</h2>
        <div className="bg-gray-200 h-[500px] flex items-center justify-center mb-10">
          <span className="text-gray-500">Image Placeholder</span>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-12">
          <h3 className="text-2xl md:text-3xl font-semibold leading-snug md:w-1/2">
            At Sofa Society, we believe that a sofa is the heart of every home.
          </h3>
          <div className="text-sm text-gray-600 md:w-1/2 space-y-3">
            <p>
              We are dedicated to delivering high-quality, thoughtfully designed sofas that merge comfort and style effortlessly.
            </p>
            <p>
              Our mission is to transform your living space into a sanctuary of relaxation and beauty, with products built to last.
            </p>
            <Link
                href="/about"
                className="underline underline-offset-2 hover:text-gray-800 block pt-2"
                >
                Read more about Sofa Society
            </Link>

          </div>
        </div>
      </section>

    </main>
  )
}
