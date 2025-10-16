"use client"

import Link from "next/link"
import CollectionsSection from "../home/CollectionsMenu"

export default function InspirationPage() {
  return (
    <main className="bg-white text-black-900">

      <section className="flex flex-col items-center">
        <img
          src="/images/inspiration/9176ac4e43f584f40878ed292d00ce6f88fb89ed (1).png"
          alt="Living room with dark green sofa"
          className="mb-4 w-full md:w-auto max-w-[1060px] h-auto rounded-md"
        />
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-12 mb-24 mt-14 gap-12">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 leading-snug gap-12">
              The Astrid Curve sofa is a masterpiece of minimalism and luxury.
            </h2>
            <p className="text-black-600 text-base md:text-lg max-w-md gap-12">
              Our design philosophy revolves around creating pieces that are both
              beautiful and practical. Inspired by Scandinavian simplicity,
              modern luxury, and timeless classics.
            </p>
          </div>

          <div>
            <div className="flex flex-col items-center">
              <img
                src="/images/inspiration/img-9bF66mNTICCG6H9G6m5qE.png"
                alt="Astrid Curve sofa"
                className="mb-4 w-full max-w-[320px] h-auto rounded-md"
              />
              <div className="flex justify-between text-sm w-full max-w-[320px]">
                <div>
                  <p className="font-medium">Astrid Curve</p>
                  <p className="text-black-500 text-xs">Scandinavian Simplicity</p>
                </div>
                <p className="font-semibold">1500€</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-12 mb-24">
        <img
          src="/images/inspiration/image.png"
          alt="Haven Sofas in living room"
          className="w-full h-[700px] object-cover mb-16 rounded-lg"
        />
        <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 leading-snug min-w-[520px]">
            Haven Sofas have minimalistic designs, neutral colors, and
            high-quality textures.
          </h2>
          <p className="text-black-600 text-base md:text-lg max-w-md mb-8">
            Perfect for those who seek comfort with a clean and understated
            aesthetic. This collection brings the essence of Scandinavian
            elegance to your living room.
          </p>
        </div>

        <div className="space-y-10">
          <div className="flex flex-col items-center">
            <img
              src="/images/inspiration/img-9bF66mNTICCG6H9G6m5qE (1).png"
              alt="Nordic Haven sofa"
              className="mb-4 w-full max-w-[320px] h-auto rounded-md"
            />
            <div className="flex justify-between text-sm w-full max-w-[320px]">
              <div>
                <p className="font-medium">Nordic Haven</p>
                <p className="text-black-500 text-xs">Scandinavian Simplicity</p>
              </div>
              <p className="font-semibold">1500€</p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <img
              src="/images/inspiration/PpqGNiyxQXeSNufJ_9JMiA.png"
              alt="Nordic Breeze chair"
              className="mb-4 w-full max-w-[320px] h-auto rounded-md"
            />
            <div className="flex justify-between text-sm w-full max-w-[320px]">
              <div>
                <p className="font-medium">Nordic Breeze</p>
                <p className="text-black-500 text-xs">Scandinavian Simplicity</p>
              </div>
              <p className="font-semibold">1200€</p>
            </div>
          </div>
        </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-12 mb-24">
        <img
          src="/images/inspiration/image (1).png"
          alt="Oslo Drift interior"
          className="w-full h-[600px] object-cover mb-16 rounded-lg"
        />
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-[34px] font-semibold mb-6 leading-snug">
              Oslo Drift is infused with playful textures and vibrant patterns
              with eclectic vibes.
            </h2>
            <p className="text-black-600 text-base md:text-lg max-w-lg">
              Whether you're looking for bold statement pieces or subtle elegance,
              this collection elevates your home with a touch of glamour,
              sophistication, and unmatched coziness.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <img
              src="/images/inspiration/img-COlAMp7OIMZ6ya3a3Ud3h.png"
              alt="Oslo Drift sofa"
              className="mb-4 w-full max-w-[320px] h-auto rounded-md"
            />
            <div className="flex justify-between text-sm w-full max-w-[320px]">
              <div>
                <p className="font-medium">Oslo Drift</p>
                <p className="text-black-500 text-xs">Scandinavian Simplicity</p>
              </div>
              <div>
                <p className="font-semibold">2000€</p>
                <p className="font-semibold text-red-500 line-through">3000€</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CollectionsSection />
    </main>
  )
}
