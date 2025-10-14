"use client"

export default function AboutPage() {
  return (
    <main className="bg-white text-black-900">

      <section className="max-w-6xl mx-auto flex flex-col items-center px-6 md:px-12 py-20">
        <img
          src="/images/about/Image Hero.png"
          alt="About hero"
          className="w-full h-auto rounded-md mb-12"
        />
        <div className="grid md:grid-cols-2 gap-12 items-start w-full space-y-14">
          <h2 className="text-3xl md:text-4xl font-semibold leading-snug">
            At Sofa Society, we believe that a sofa is the heart of every home.
          </h2>
          <div className="text-black text-base md:text-lg space-y-4">
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

      <section className="max-w-6xl mx-auto flex flex-col items-center px-6 md:px-12 py-20">
        <img
          src="/images/about/image (1).png"
          alt="About quality section"
          className="w-full h-auto rounded-md mb-12"
        />
        <div className="grid md:grid-cols-2 gap-12 items-start w-full">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-semibold leading-snug">
              We are here to make your living space a true reflection of your personal style.
            </h2>
            <div className="text-black-600 text-base md:text-lg space-y-4">
              <p>
                At the heart of our brand is a deep commitment to quality. We understand that a sofa isn’t just another piece of furniture;
                it’s where you unwind, gather with loved ones, and make memories. That’s why we source only the finest materials and fabrics,
                ensuring that every sofa we offer is built to last.
              </p>
              <p>
                From luxurious leathers and soft linens to high-performance textiles, each fabric is carefully selected for its durability and beauty.
                Our attention to detail extends to every stitch and seam, guaranteeing that your sofa will not only look stunning but will also
                withstand the test of time.
              </p>
            </div>
          </div>
          <div></div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-x-24 gap-y-12 items-start px-6 md:px-12 py-20">
        <div>
          <img
            src="/images/about/image (2).png"
            alt="About sustainability section"
            className="w-full h-auto rounded-md"
          />
        </div>
        <div className="flex flex-col space-y-16">
          <div className="text-black-600 text-[9px] md:text-sm space-y-2 leading-relaxed">
            <p>
              Our design philosophy revolves around creating pieces that are both beautiful and practical.
              Inspired by Scandinavian simplicity, modern luxury, and timeless classics, our collections are
              curated to suit a wide variety of tastes and lifestyles. We understand that every home is different,
              so we offer a diverse range of styles, colors, and textures to help you find the perfect fit.
              Whether you prefer sleek modern lines or soft, inviting silhouettes, we have something to suit
              every space and personality.
            </p>
          </div>
          <h2 className="text-lg md:text-xl font-semibold leading-snug text-black-900">
            We believe that great design should be environmentally conscious, which is why we strive to minimise
            our environmental footprint through responsible sourcing and production practices. Our commitment to
            sustainability ensures that our products are not only beautiful but also kind to the planet.
          </h2>
        </div>
      </section>

      <section className="max-w-6xl mx-auto flex flex-col items-center px-6 md:px-12 py-20">
        <img
          src="/images/about/image.png"
          alt="About customer section"
          className="w-full h-auto rounded-md mb-12"
        />
        <div className="grid md:grid-cols-2 gap-12 items-start w-full space-y-14">
          <h2 className="text-3xl md:text-4xl font-semibold leading-snug">
            Our customers are at the center of everything we do!
          </h2>
          <div className="text-black text-base md:text-lg space-y-4">
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
