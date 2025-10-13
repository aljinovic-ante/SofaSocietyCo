import { ReactQueryProvider } from "@/providers/ReactQueryProvider"
import "styles/globals.css"

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <ReactQueryProvider>
          <main className="relative">{props.children}</main>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
