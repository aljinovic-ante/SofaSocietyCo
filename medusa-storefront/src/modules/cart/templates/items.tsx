import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import { Heading, Table } from "@medusajs/ui"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items

  return (
    <div className="bg-white">
      <div className="pb-8">
        <Heading className="text-4xl font-semibold leading-tight ml-6">
          Your shopping cart
        </Heading>
        <div className="border-b-2 border-gray-300 mt-3 ml-6 mr-6 py-3" />
      </div>

      <Table className="w-full border-separate border-spacing-y-1">
        <Table.Header className="hidden" /> 
        <Table.Body>
          {items
            ? items
                .sort((a, b) => {
                  return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                })
                .map((item) => (
                  <Item
                    key={item.id}
                    item={item}
                    currencyCode={cart?.currency_code}
                  />
                ))
            : repeat(3).map((i) => <SkeletonLineItem key={i} />)}
        </Table.Body>
      </Table>
    </div>
  )
}

export default ItemsTemplate
