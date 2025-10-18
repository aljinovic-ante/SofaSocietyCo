import { HttpTypes } from "@medusajs/types"
import { twMerge } from "tailwind-merge"
import { retrieveCustomer } from "@/lib/data/customer"
import { listOrders } from "@/lib/data/orders"

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder
}

export default async function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  const customer = await retrieveCustomer()
  let matchingOrders: HttpTypes.StoreOrder[] = []

  if (customer) {
    const { orders } = await listOrders()
    matchingOrders = orders ? orders.filter((o) => o.id === order?.id) : []
  }

  const fallbackAddress = customer?.addresses?.[0]
  const shippingAddress =
    order.shipping_address && order.shipping_address.address_1
      ? order.shipping_address
      : fallbackAddress

  return (
    <div className="mx-auto grid grid-cols-12 gap-x-4 md:gap-x-12 px-4 sm:container py-20 pt-32">
      <div className="col-start-1 col-end-13 lg:col-start-3 lg:col-end-11 xl:col-start-4 xl:col-end-10">
        <h1 className="text-3xl md:text-5xl text-left mb-10 md:mb-20">
          Thank you for your order!
        </h1>

        <p className="text-lg text-left mb-4">
          We are pleased to confirm that your order has been successfully placed
          and will be processed shortly.
        </p>
        <p className="text-left mb-12">
          We have sent you the receipt and order details via <strong>e-mail</strong>.<br />
          Your order number is <strong>#{order.display_id}</strong>.
        </p>

        <div className="flex flex-wrap gap-4 mb-20">
          {Boolean(matchingOrders.length) && (
            <a
              href={`/account/my-orders/${order.id}`}
              className="px-6 py-3 rounded-md bg-gray-200 hover:bg-gray-300 text-black transition"
            >
              Check order details
            </a>
          )}
          <a
            href="/"
            className="px-6 py-3 rounded-md bg-black text-white hover:bg-gray-800 transition"
          >
            Back to home
          </a>
        </div>

        <div className="flex flex-col sm:flex-row gap-x-6 gap-y-6 mb-16">
          <div className="flex-1 overflow-hidden rounded-xs border border-grayscale-200 p-4">
            <div className="flex gap-4 items-center mb-8">
              <span className="text-lg text-grayscale-500">📦</span>
              <p className="text-grayscale-500">Delivery address</p>
            </div>
            <p>
              {[shippingAddress?.first_name || customer?.first_name, shippingAddress?.last_name || customer?.last_name]
                .filter(Boolean)
                .join(" ")}
              <br />
              {[
                shippingAddress?.address_1,
                [shippingAddress?.postal_code, shippingAddress?.city]
                  .filter(Boolean)
                  .join(" "),
                shippingAddress?.country?.display_name || shippingAddress?.province,
              ]
                .filter(Boolean)
                .join(", ")}
              <br />
              {shippingAddress?.phone || customer?.phone}
            </p>
          </div>

          <div className="flex-1 overflow-hidden rounded-xs border border-grayscale-200 p-4">
            <div className="flex gap-4 items-center mb-8">
              <span className="text-lg text-grayscale-500">🧾</span>
              <p className="text-grayscale-500">Billing address</p>
            </div>
            <p>
              {[shippingAddress?.first_name || customer?.first_name, shippingAddress?.last_name || customer?.last_name]
                .filter(Boolean)
                .join(" ")}
              <br />
              {[
                shippingAddress?.address_1,
                [shippingAddress?.postal_code, shippingAddress?.city]
                  .filter(Boolean)
                  .join(" "),
                shippingAddress?.country?.display_name || shippingAddress?.province,
              ]
                .filter(Boolean)
                .join(", ")}
              <br />
              {shippingAddress?.phone || customer?.phone}
            </p>
          </div>
        </div>

        <div className="rounded-xs border border-grayscale-200 p-6 mb-20">
          {order.items?.map((item) => {
            const variantTitle = item.variant?.title ?? ""
            const [material, color] = variantTitle.split(" / ")

            return (
              <div
                className={twMerge(
                  "flex flex-col sm:flex-row justify-between sm:items-start gap-6 sm:gap-10 mb-6 pb-6 border-b border-grayscale-100 last:border-0 last:mb-0 last:pb-0 relative"
                )}
                key={item.id}
              >
                <a href={`/products/${item.product_handle}`}>
                  <img
                    src={item.variant?.product?.thumbnail || "/placeholder.jpg"}
                    alt={item.product_title || "Product Image"}
                    className="w-32 h-auto rounded-md object-cover"
                  />
                </a>

                <div className="flex flex-col flex-1 text-left">
                  <p className="text-xl font-semibold mb-2">
                    <a href={`/products/${item.product_handle}`}>
                      {item.product_title}
                    </a>
                  </p>

                  {(material || color) && (
                    <div className="text-sm text-grayscale-500 mb-4">
                      {material && (
                        <p>
                          Material: <span className="text-black">{material}</span>
                        </p>
                      )}
                      {color && (
                        <p>
                          Color: <span className="text-black">{color}</span>
                        </p>
                      )}
                    </div>
                  )}

                  <p className="text-sm text-grayscale-500 mt-14">
                    Quantity: <span className="text-black">{item.quantity}</span>
                  </p>
                </div>

                <p className="absolute bottom-0 right-0 text-xl font-semibold mb-1 mr-1">
                  €{(item.unit_price).toFixed(2)}
                </p>
              </div>
            )
          })}
        </div>

        <div className="rounded-xs border border-grayscale-200 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-start mt-24">
          <div className="flex items-center gap-3">
            <span className="text-lg text-grayscale-500">💳</span>
            <p className="text-grayscale-500 text-base">Payment</p>
          </div>

          <div className="flex flex-col items-end text-right sm:mt-0 mt-6">
            <div className="flex justify-between w-56">
              <p className="text-grayscale-500">Subtotal</p>
              <p className="font-semibold">€{(order.subtotal).toFixed(2)}</p>
            </div>
            <div className="flex justify-between w-56">
              <p className="text-grayscale-500">Shipping</p>
              <p className="font-semibold">€{(order.shipping_total).toFixed(2)}</p>
            </div>
            <div className="flex justify-between w-56">
              <p className="text-grayscale-500">Taxes</p>
              <p className="font-semibold">€{(order.tax_total).toFixed(2)}</p>
            </div>
            <div className="flex justify-between w-56 mt-2">
              <p className="font-semibold text-lg">Total</p>
              <p className="font-semibold text-lg">€{(order.total).toFixed(2)}</p>
            </div>
            <p className="text-xs text-grayscale-500 mt-1">
              Including {(order.tax_total).toFixed(2)} tax
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
