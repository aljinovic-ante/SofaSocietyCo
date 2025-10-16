import { notFound } from "next/navigation"
import ProductClient from "./product-client"

type ProductPageProps = {
  params: Promise<{ countryCode: string; handle: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/products?handle=${handle}&region_id=reg_01K7P8H7TRF9E0AXS39PAGVT5H`,
    {
      headers: {
        "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY!,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  )


  if (!res.ok) {
    console.error("Failed to fetchhhhhhh......:", await res.text())
    notFound()
  }

  const data = await res.json()
  const product = data.products?.[0]
  if (!product) notFound()
  if (product.variants?.length) {
    console.log(`Variants for "${product.title}":`)
    product.variants.forEach((variant: any) => {
      const calc = variant.calculated_price
      const price = calc?.calculated_amount
        ? `${(calc.calculated_amount / 100).toFixed(2)} ${calc.currency_code?.toUpperCase()}`
        : "Error"

      console.log({
        id: variant.id,
        title: variant.title,
        price,
      })
    })
  } else {
    console.log("No variants found for this product.")
  }

  return <ProductClient product={product} />
}
