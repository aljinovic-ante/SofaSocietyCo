"use client"

import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { z } from "zod"
import {
  getCustomer,
  signup,
  login,
  signout,
  updateCustomer,
  addCustomerAddress,
  deleteCustomerAddress,
  updateCustomerAddress,
} from "@lib/data/customer"

export const useCustomer = () => {
  return useQuery({
    queryKey: ["customer"],
    queryFn: async () => {
      const customer = await getCustomer()
      return customer
    },
    staleTime: 600 * 1000,
  })
}

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  redirect_url: z.string().optional().nullable(),
})

export const useLogin = (
  options?: UseMutationOptions<
    { success: boolean; redirectUrl?: string; message?: string },
    Error,
    z.infer<typeof loginFormSchema>
  >
) => {
  const client = useQueryClient()

  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (values: z.infer<typeof loginFormSchema>) => {
      const formData = new FormData()
      for (const [key, value] of Object.entries(values)) {
        if (value !== null && value !== undefined)
          formData.append(key, value.toString())
      }

      await login(formData)
      return { success: true, redirectUrl: "/account" }
    },

    onSuccess: async (...args) => {
      await client.invalidateQueries({ queryKey: ["customer"] })
      await options?.onSuccess?.(...args)
    },
    ...options,
  })
}

export const useSignout = (
  options?: UseMutationOptions<void, Error, string>
) => {
  const client = useQueryClient()

  return useMutation({
    mutationKey: ["signout"],
    mutationFn: async (countryCode: string) => {
      await signout(countryCode)
    },
    onSuccess: async (...args) => {
      await client.invalidateQueries({ queryKey: ["customer"] })
      await options?.onSuccess?.(...args)
    },
    ...options,
  })
}

export const customerAddressSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  company: z.string().optional().nullable(),
  address_1: z.string().min(1),
  address_2: z.string().optional().nullable(),
  city: z.string().min(1),
  postal_code: z.string().min(1),
  province: z.string().optional().nullable(),
  country_code: z.string().min(2),
  phone: z.string().optional().nullable(),
})

export const useAddressMutation = (
  addressId?: string,
  options?: UseMutationOptions<
    { success: boolean; error?: string | null },
    Error,
    z.infer<typeof customerAddressSchema>
  >
) => {
  const client = useQueryClient()
  return useMutation({
    mutationKey: ["address"],
    mutationFn: async (values: z.infer<typeof customerAddressSchema>) => {
      const formData = new FormData()
      for (const [key, value] of Object.entries(values)) {
        if (value) formData.append(key, value)
      }
      return addressId
      ? updateCustomerAddress(addressId, formData)
      : addCustomerAddress(formData)
    },
    onSuccess: async (...args) => {
      await client.invalidateQueries({ queryKey: ["customer"] })
      await options?.onSuccess?.(...args)
    },
    ...options,
  })
}

export const useDeleteCustomerAddress = (
  options?: UseMutationOptions<void, Error, string>
) => {
  const client = useQueryClient()
  return useMutation({
    mutationKey: ["delete-address"],
    mutationFn: async (addressId: string) => deleteCustomerAddress(addressId),
    onSuccess: async (...args) => {
      await client.invalidateQueries({ queryKey: ["customer"] })
      await options?.onSuccess?.(...args)
    },
    ...options,
  })
}
export const signupFormSchema = z.object({
  email: z.string().email(),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  phone: z.string().optional().nullable(),
  password: z.string().min(6),
})

export const useSignup = (
  options?: UseMutationOptions<
    { success: boolean; customer?: any; error?: string },
    Error,
    z.infer<typeof signupFormSchema>
  >
) => {
  const client = useQueryClient()

  return useMutation({
    mutationKey: ["signup"],
    mutationFn: async (values: z.infer<typeof signupFormSchema>) => {
      return await signup(values)
    },
    onSuccess: async (...args) => {
      await client.invalidateQueries({ queryKey: ["customer"] })
      await options?.onSuccess?.(...args)
    },
    ...options,
  })
}

export const updateCustomerFormSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  phone: z.string().optional().nullable(),
})

export const useUpdateCustomer = (
  options?: UseMutationOptions<
    { state: "error" | "success" | "initial"; error?: string },
    Error,
    z.infer<typeof updateCustomerFormSchema>
  >
) => {
  const client = useQueryClient()
  return useMutation({
    mutationKey: ["update-customer"],
    mutationFn: async (values: z.infer<typeof updateCustomerFormSchema>) =>
      updateCustomer(values as any),
    onSuccess: async (...args) => {
      await client.invalidateQueries({ queryKey: ["customer"] })
      await options?.onSuccess?.(...args)
    },
    ...options,
  })
}
