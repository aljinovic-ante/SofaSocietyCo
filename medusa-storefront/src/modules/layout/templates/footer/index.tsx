import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black-50 border-t border-black-200 py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-black-900">
        <div>
          <h2 className="text-2xl font-bold leading-tight">Sofa<br />Society<br />Co.</h2>
          <p className="text-sm text-black-500 mt-4">© 2025, Sofa Society</p>
        </div>

        <div className="flex flex-col space-y-2 text-sm">
          <a href="#">FAQ</a>
          <a href="#">Help</a>
          <a href="#">Delivery</a>
          <a href="#">Returns</a>
        </div>

        <div className="flex flex-col space-y-2 text-sm">
          <a href="#">Instagram</a>
          <a href="#">TikTok</a>
          <a href="#">Pinterest</a>
          <a href="#">Facebook</a>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Join our newsletter</h3>
          <p className="text-sm text-black-600 mb-4">
            We will also send you our discount coupons!
          </p>
          <form className="flex mb-3">
            <input
              type="email"
              placeholder="Your email"
              className="w-full rounded-md border border-black-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              className="ml-2 bg-black text-white px-4 py-2 text-sm rounded-md hover:bg-black-800 transition"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-black-500">
            By subscribing you agree to with our{" "}
            <Link href="/privacy-policy" className="underline">
              Privacy Policy
            </Link>{" "}
            and provide consent to receive updates from our company.
          </p>
        </div>
      </div>
    </footer>
  )
}
