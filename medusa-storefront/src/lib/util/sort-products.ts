import { HttpTypes } from "@medusajs/types"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

export function sortProducts(
  products: HttpTypes.StoreProduct[],
  sortBy: SortOptions
) {
  console.log("USLO")

  if (sortBy === "price_asc") {
    console.log("USLO1")
    
    return [...products].sort((a, b) => {
      const priceA = a.variants?.[0]?.calculated_price?.calculated_amount ?? 0
      console.log("A: ",a.variants)
      const priceB = b.variants?.[0]?.calculated_price?.calculated_amount ?? 0
      console.log("B: ",b.variants)

      return priceA - priceB
    })
  }

  if (sortBy === "price_desc") {
    console.log("USLO2")

    return [...products].sort((a, b) => {
      const priceA = a.variants?.[0]?.calculated_price?.calculated_amount ?? 0
      const priceB = b.variants?.[0]?.calculated_price?.calculated_amount ?? 0
      return priceB - priceA
    })
  }

  return [...products].sort((a, b) => {
    console.log("USLO3")

    const dateA = a.created_at ? new Date(a.created_at).getTime() : 0
    console.log("A: ",dateA)

    const dateB = b.created_at ? new Date(b.created_at).getTime() : 0
    console.log("B: ",dateB)

    return dateB - dateA
  })
}
