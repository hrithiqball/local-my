import { createBusiness } from '@/api/business'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/store/auth-store'
import { CreateBusiness } from '@/types/business'
import { PhotoState } from '@/types/photo'
import { CreateBusinessSchema } from '@/validation/business'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type CreateBusinessFormProps = {
  formId: string
}

export default function CreateBusinessForm({ formId }: CreateBusinessFormProps) {
  const userId = useAuthStore.use.user()?.id
  const queryClient = useQueryClient()

  const [coverPhoto, setCoverPhoto] = useState<PhotoState>({ file: null, preview: null })
  const [profilePhoto, setProfilePhoto] = useState<PhotoState>({ file: null, preview: null })

  const mutation = useMutation({
    mutationFn: createBusiness,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-business', userId] })
      toast.success('Business created successfully')
    },
    onError: err => {
      if (err instanceof Error) {
        toast.error(err.message)
        return
      }

      toast.error('An unknown error occurred. Please try again.')
    }
  })

  function handlePhotoChange(
    e: React.ChangeEvent<HTMLInputElement>,
    setPhoto: React.Dispatch<React.SetStateAction<PhotoState>>
  ) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onload = () => setPhoto({ file, preview: reader.result as string })
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const form = useForm<CreateBusiness>({
    resolver: zodResolver(CreateBusinessSchema)
  })

  async function onSubmit(values: CreateBusiness) {
    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('email', values.email)
    formData.append('phone', values.phone)
    values.description && formData.append('description', values.description)
    values.address && formData.append('address', values.address)
    values.website && formData.append('website', values.website)
    coverPhoto.file && formData.append('coverPhoto', coverPhoto.file as Blob)
    profilePhoto.file && formData.append('profilePhoto', profilePhoto.file as Blob)

    mutation.mutate(formData)
  }

  return (
    <div className="flex flex-col items-center space-y-20 p-4">
      <div className="relative w-full max-w-sm">
        <div className="flex aspect-video h-48 w-full items-center justify-center overflow-hidden rounded-lg bg-gray-200">
          {coverPhoto.preview ? (
            <img
              src={coverPhoto.preview}
              alt="Cover Photo"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-sm text-gray-500">Click to add a cover photo</span>
          )}
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 cursor-pointer opacity-0"
            onChange={e => handlePhotoChange(e, setCoverPhoto)}
          />
        </div>

        <div className="absolute bottom-0 left-4 size-20 translate-y-1/2 transform overflow-hidden rounded-full border-2 border-gray-500 bg-gray-200">
          {profilePhoto.preview ? (
            <img
              src={profilePhoto.preview}
              alt="Profile Photo"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="flex h-full items-center justify-center text-center text-xs text-gray-500">
              Click to add a profile photo
            </span>
          )}
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 cursor-pointer opacity-0"
            onChange={e => handlePhotoChange(e, setProfilePhoto)}
          />
        </div>
      </div>
      <Form {...form}>
        <form
          id={formId}
          className="w-full max-w-sm space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="My Awesome Business" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="We sell legal things" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="megah@holding.my" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="01987654321" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Jalan Lepak, Depan SpeedMart, 14150, Klang, Columbia"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input placeholder="https://not-localhost.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}
