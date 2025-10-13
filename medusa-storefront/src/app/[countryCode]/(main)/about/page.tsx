"use client"

export default function AboutPage() {
  return (
    <main className="bg-white text-gray-900">

      <section className="flex flex-col">
        <div className="bg-gray-200 h-[600px] flex items-center justify-center">
          <span className="text-gray-500">Image Placeholder</span>
        </div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-6 md:px-12 py-20">
          <h2 className="text-3xl font-semibold leading-snug">
            At Sofa Society, we believe that a sofa is the heart of every home.
          </h2>
          <div className="text-sm text-gray-600 space-y-3">
            <p>
              Welcome to Sofa Society, where we believe that comfort and style should be effortlessly intertwined. 
              Our mission is to help you create beautiful, functional spaces that bring warmth and relaxation into your home.
            </p>
            <p>
              Every piece in our collection is designed with care, blending timeless craftsmanship with modern aesthetics 
              to offer you the perfect balance between form and function.
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col">
        <div className="bg-gray-200 h-[600px] flex items-center justify-center">
          <span className="text-gray-500">Image Placeholder</span>
        </div>
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-20">
          <h2 className="text-3xl font-semibold leading-snug mb-4">
            We are here to make your living space a true reflection of your personal style.
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            At the heart of our brand is a deep commitment to quality. We understand that a sofa isn’t just another piece of furniture; 
            it’s where you unwind, gather with loved ones, and make memories.
          </p>
          <p className="text-sm text-gray-600">
            That’s why we source only the finest materials and fabrics, ensuring that every sofa we offer is built to last.
          </p>
        </div>
      </section>


      <section className="flex flex-col">
        <div className="bg-gray-200 h-[600px] flex items-center justify-center">
          <span className="text-gray-500">Image Placeholder</span>
        </div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-6 md:px-12 py-20">
          <div className="text-sm text-gray-600 space-y-3">
            <p>
              Our design philosophy revolves around creating pieces that are both beautiful and practical. 
              Inspired by Scandinavian simplicity, modern luxury, and timeless classics, our collections are 
              curated to suit a wide variety of tastes and lifestyles.
            </p>
            <p>
              Our commitment to sustainability ensures that our products are not only beautiful but also kind to the planet.
            </p>
          </div>
          <h2 className="text-3xl font-semibold leading-snug">
            We believe that great design should be environmentally conscious.
          </h2>
        </div>
      </section>


      <section>
        <div className="bg-gray-200 h-[600px] flex items-center justify-center">
          <span className="text-gray-500">Image Placeholder</span>
        </div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12 px-6 md:px-12 py-20">
          <h2 className="text-3xl md:text-4xl font-semibold leading-snug md:w-1/2">
            Our customers are at the center of everything we do!
          </h2>
          <div className="text-sm text-gray-600 md:w-1/2 space-y-3">
            <p>
              Our team is here to help guide you through the process, offering personalised support 
              to ensure that you find exactly what you’re looking for.
            </p>
            <p>
              We’re not just selling sofas — we’re helping you create spaces where you can relax, recharge, 
              and make lasting memories. Thank you for choosing Sofa Society to be a part of your home!
            </p>
          </div>
        </div>
      </section>

    </main>
  )
}
