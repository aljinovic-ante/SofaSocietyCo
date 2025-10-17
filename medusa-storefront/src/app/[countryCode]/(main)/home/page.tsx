"use client"

import Link from "next/link"
import CollectionsSection from "./CollectionsMenu"

export default function HomePage() {
  return (
    <main className="bg-white text-black-900">
      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto">

        <div className="h-[500px] mb-10">
          <img
            src="/images/homepage/daf7044a00fa49769ee7e83e963e0d570b042a1f.png"
            alt="Homepage header photo"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center py-5">
          <h2 className="text-4xl md:text-[40px] font-semibold leading-tight max-w-[570px]">
            Elevate Your Living Space with Unmatched Comfort & Style
          </h2>
          <div className="text-sm md:text-base flex flex-col items-start mt-6 md:mt-0">
            <p className="text-black-700">Discover Your Perfect Sofa Today</p>
            <Link
              href="/shop"
              className="underline underline-offset-2 mt-1 hover:text-black-800 transition"
            >
              Explore Now
            </Link>
          </div>
        </div>

      </section>

      <section className="py-5 px-6 md:px-12 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-10">Our products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <a
            href="http://localhost:8000/hr/shop?category=two-seater"
            className="flex flex-col items-center group"
          >
            <div className="overflow-hidden rounded-lg w-full">
              <img
                src="/images/homepage/image (1).png"
                alt="Sofas"
                className="h-[400px] w-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <p className="mt-4 text-sm font-medium">Sofas</p>
          </a>

          <a
            href="http://localhost:8000/hr/shop?category=one-seater"
            className="flex flex-col items-center group"
          >
            <div className="overflow-hidden rounded-lg w-full">
              <img
                src="/images/homepage/image (2).png"
                alt="Arm Chairs"
                className="h-[400px] w-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <p className="mt-4 text-sm font-medium">Arm Chairs</p>
          </a>
        </div>
      </section>

      <CollectionsSection />

      <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-10">About Sofa Society</h2>
        <div className="h-[500px] mb-10">
          <img
            src="/images/homepage/image (3).png"
            alt="Homepage visual"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <h3 className="text-2xl md:text-3xl font-semibold leading-snug md:w-1/2">
            At Sofa Society, we believe that a sofa is the heart of every home.
          </h3>
          <div className="text-sm text-black-600 md:w-1/2 space-y-3">
            <p>
              We are dedicated to delivering high-quality, thoughtfully designed sofas that merge comfort and style effortlessly.
            </p>
            <p>
              Our mission is to transform your living space into a sanctuary of relaxation and beauty, with products built to last.
            </p>
            <Link
              href="/about"
              className="underline underline-offset-2 hover:text-black-800 block pt-2"
            >
              Read more about Sofa Society
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
