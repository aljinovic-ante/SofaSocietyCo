"use server"

import { z } from "zod"
import { redirect } from "next/navigation"
import { revalidateTag } from "next/cache"
import { HttpTypes } from "@medusajs/types"

import { sdk } from "@lib/config"
import {
  getAuthHeaders,
  setAuthToken,
  removeAuthToken,
  getCartId,
  getCacheTag,
} from "@lib/data/cookies"
import {
  signupFormSchema,
  updateCustomerFormSchema,
} from "@/hooks/customer"

export const retrieveCustomer = async function () {
  return await sdk.client
    .fetch<{ customer: HttpTypes.StoreCustomer }>(`/store/customers/me`, {
      next: { tags: ["customer"] },
      headers: { ...(await getAuthHeaders()) },
      cache: "no-store",
    })
    .then(({ customer }) => customer)
    .catch(() => null)
}

export const updateCustomer = async function (
  formData: z.infer<typeof updateCustomerFormSchema>
): Promise<
  { state: "initial" | "success" } | { state: "error"; error: string }
> {
  return sdk.store.customer.update(
      {
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone ?? undefined,
      },
      {},
      await getAuthHeaders()
    )
    .then(() => {
      revalidateTag("customer")
      return {
        state: "success" as const,
      }
    })
    .catch(() => {
      revalidateTag("customer")
      return {
        state: "error" as const,
        error: "Fail updatecustomer",
      }
    })
}

export async function signup(formData: z.infer<typeof signupFormSchema>) {
  try {
    const token = await sdk.auth.register("customer", "emailpass", {
      email: formData.email,
      password: formData.password,
    })

    const customHeaders = { authorization: `Bearer ${token}` }

    const { customer: createdCustomer } = await sdk.store.customer.create(
      {
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone ?? undefined,
      },
      {},
      customHeaders
    )

    const loginToken = await sdk.auth.login("customer", "emailpass", {
      email: formData.email,
      password: formData.password,
    })

    if (typeof loginToken === "object") {
      redirect(loginToken.location)
    }

    await setAuthToken(loginToken)

    // await sdk.client.fetch("/store/custom/customer/send-welcome-email", {
    //   method: "POST",
    //   headers: await getAuthHeaders(),
    // })

    revalidateTag("customer")

    const cart = await getCartId()
    if (cart) {
      await sdk.store.cart.transferCart(cart, {}, await getAuthHeaders())
      revalidateTag("cart")
    }
    return { success: true, customer: createdCustomer }
  } 
  catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : `${error}`,
    }
  }
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const redirectUrl = formData.get("redirect_url") as string | null

  try {
    const token = await sdk.auth.login("customer", "emailpass", {
      email,
      password,
    })

    if (typeof token === "object") {
      return { success: true, redirectUrl: token.location }
    }

    await setAuthToken(token)

    revalidateTag("customer")

    const cart = await getCartId()
    if (cart) {
      await sdk.store.cart.transferCart(cart, {}, await getAuthHeaders())
      revalidateTag("cart")
    }

    return { success: true, redirectUrl: redirectUrl || "/" }
  } 
  catch (error) 
  {
    return {
      success: false,
      message: error instanceof Error ? error.message : `${error}`,
    }
  }
}

const resetPasswordSchema = z.object({
  email: z.string().email(),
  new_password: z.string().min(6),
  current_password: z.string().optional(),
  type: z.enum(["reset", "forgot"]),
  token: z.string().optional(),
})

export async function resetPassword(
  currentState: unknown,
  formData: z.infer<typeof resetPasswordSchema>
): Promise<
  z.infer<typeof resetPasswordSchema> & 
    ({ state: "initial" | "success" } | { state: "error"; error: string })
> {
  const validatedState = resetPasswordSchema.parse({
    ...(typeof currentState === "object" && currentState !== null ? currentState : {}),
    ...formData,
  });

  try {
    if (formData.type === "forgot") {
      console.log("Attempting password reset...");
      const response = await sdk.client.fetch(`/auth/customer/emailpass/reset-password`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-medusa-access-token": validatedState.token!,
          "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY!,
          "x-medusa-password": validatedState.new_password,
        },
        body: JSON.stringify({
          identifier: validatedState.email,
        }),
      });

      const textResponse = await response.text();
      console.log("Password reset response:", textResponse);

      if (textResponse === "Created") {
        return { ...validatedState, state: "success" as const };
      } else {
        return {
          ...validatedState,
          state: "error" as const,
          error: `Unexpected response: ${textResponse}`,
        };
      }
    } else {
      await sdk.auth.updateProvider(
        "logged-in-customer",
        "emailpass",
        {
          email: validatedState.email,
          password: validatedState.new_password,
        },
        validatedState.token
      );
      return { ...validatedState, state: "success" as const };
    }
  } catch (error) {
    console.error("Error during password reset:", error);
    return {
      ...validatedState,
      state: "error" as const,
      error: `Failed to update password: ${error instanceof Error ? error.message : error}`,
    };
  }
}


export async function signout(countryCode: string) {
  await sdk.auth.logout()

  await removeAuthToken()

  revalidateTag("customer")

  return countryCode
}

export async function transferCart() {
  const cartId = await getCartId()

  if (!cartId) {
    return
  }

  const headers = await getAuthHeaders()

  await sdk.store.cart.transferCart(cartId, {}, headers)

  const cartCacheTag = await getCacheTag("carts")
  revalidateTag(cartCacheTag)
}

export const addCustomerAddress = async (
  formData: FormData
): Promise<any> => {
  const isDefaultBilling = false
  const isDefaultShipping = false

  const address = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    company: formData.get("company") as string,
    address_1: formData.get("address_1") as string,
    address_2: formData.get("address_2") as string,
    city: formData.get("city") as string,
    postal_code: formData.get("postal_code") as string,
    province: formData.get("province") as string,
    country_code: formData.get("country_code") as string,
    phone: formData.get("phone") as string,
    is_default_billing: isDefaultBilling,
    is_default_shipping: isDefaultShipping,
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.store.customer
    .createAddress(address, {}, headers)
    .then(async ({ customer }) => {
      const customerCacheTag = await getCacheTag("customers")
      revalidateTag(customerCacheTag)
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
}

export const deleteCustomerAddress = async (
  addressId: string
): Promise<void> => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  await sdk.store.customer
    .deleteAddress(addressId, headers)
    .then(async () => {
      const customerCacheTag = await getCacheTag("customers")
      revalidateTag(customerCacheTag)
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
}

export const updateCustomerAddress = async (
  addressId: string,
  formData: FormData
): Promise<any> => {
  if (!addressId) {
    return { success: false, error: "Address ID is required" }
  }

  if (!addressId) {
    return { success: false, error: "Address ID is required" }
  }

  const address = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    company: formData.get("company") as string,
    address_1: formData.get("address_1") as string,
    address_2: formData.get("address_2") as string,
    city: formData.get("city") as string,
    postal_code: formData.get("postal_code") as string,
    province: formData.get("province") as string,
    country_code: formData.get("country_code") as string,
  } as HttpTypes.StoreUpdateCustomerAddress

  const phone = formData.get("phone") as string

  if (phone) {
    address.phone = phone
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.store.customer
    .updateAddress(addressId, address, {}, headers)
    .then(async () => {
      const customerCacheTag = await getCacheTag("customers")
      revalidateTag(customerCacheTag)
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })
}
