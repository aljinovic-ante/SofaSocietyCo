import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { cart_id?: string }

    if (!body?.cart_id) {
      return NextResponse.json({ error: "Missing cart_id" }, { status: 400 })
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/carts/${body.cart_id}/complete`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    )

    const data = await response.json()

    if (!response.ok) {
      const message =
        typeof (data as any)?.message === "string"
          ? (data as any).message
          : "Failed to complete cart"
      return NextResponse.json({ error: message }, { status: 400 })
    }

    return NextResponse.json({ order: data })
  } catch (err) {
    const message =
      typeof err === "object" && err !== null && "message" in err
        ? String((err as { message: string }).message)
        : "Unexpected server error"

    return NextResponse.json({ error: message }, { status: 500 })
  }
}
