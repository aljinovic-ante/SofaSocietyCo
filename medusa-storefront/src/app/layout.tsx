import { ReactQueryProvider } from "@/providers/ReactQueryProvider"
import { CartProvider } from "@/context/CartContext"
import "styles/globals.css"

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <ReactQueryProvider>
          <CartProvider>
            <main className="relative">{props.children}</main>
          </CartProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
