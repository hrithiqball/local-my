import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Boxes, DollarSign, FileIcon, FileText, ImageIcon, Package, Tag } from 'lucide-react'
import { toast } from 'sonner'

import { getBusiness } from '@/api/business'
import { createProduct } from '@/api/product'
import ErrorComponent from '@/components/error'
import LoadingComponent from '@/components/loading'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import Header from '@/components/ui/header'
import { Input } from '@/components/ui/input'
import { PhotoState } from '@/types/photo'
import { CreateProduct } from '@/types/product'
import { CreateProductSchema } from '@/validation/product'

export default function ProductCreatePage() {
  const { businessId } = useParams()
  const queryClient = useQueryClient()

  const [productPhoto, setProductPhoto] = useState<PhotoState>({ file: null, preview: null })

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['business', businessId],
    queryFn: () => getBusiness(businessId ?? '')
  })

  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business', businessId] })
      toast.success('Product created successfully')
    },
    onError: err => {
      if (err instanceof Error) {
        toast.error(err.message)
        return
      }

      toast.error('An unknown error occurred. Please try again.')
    }
  })

  const form = useForm<CreateProduct>({
    resolver: zodResolver(CreateProductSchema)
  })

  function onSubmit(values: CreateProduct) {
    const formData = new FormData()

    formData.append('name', values.name)
    formData.append('businessId', businessId ?? '')
    formData.append('price', values.price.toString())
    formData.append('stock', values.stock.toString())
    formData.append('type', values.type)
    formData.append('description', values.description ?? '')
    formData.append('featurePhoto', productPhoto.file as Blob)

    createProductMutation.mutate(formData)
  }

  function handlePhotoChange(setPhoto: React.Dispatch<React.SetStateAction<PhotoState>>) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0]
        const reader = new FileReader()

        reader.onload = () => setPhoto({ file, preview: reader.result as string })
        reader.readAsDataURL(e.target.files[0])
      }
    }
  }

  if (!businessId) return <div>Business not found</div>

  if (isLoading) return <LoadingComponent />
  if (isError || !data)
    return <ErrorComponent message={!data ? 'No data received' : error.message} />

  return (
    <div className="flex flex-col space-y-8">
      <Header title={data.name} description={`Add new and fresh product to our business`} />
      <div className="flex justify-center">
        <Form {...form}>
          <form
            id="create-product-form"
            className="w-full max-w-md space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center space-x-2">
                    <Package className="size-4" />
                    <span>Name</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="My Amazing Product" {...field} />
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
                  <FormLabel className="flex items-center space-x-2">
                    <FileText className="size-4" />
                    <span>Description</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Made with banana and love" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center space-x-2">
                    <DollarSign className="size-4" />
                    <span>Price</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="12.50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center space-x-2">
                    <Boxes className="size-4" />
                    <span>Stock</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="420" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center space-x-2">
                    <Tag className="size-4" />
                    <span>Type</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Food, Accessories, etc" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel className="flex items-center space-x-2">
                <ImageIcon className="size-4" />
                <span>Photo</span>
              </FormLabel>
              <div className="relative">
                <div className="flex aspect-video h-48 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed border-gray-500 bg-gray-100 dark:bg-gray-800">
                  {productPhoto.preview ? (
                    <img
                      src={productPhoto.preview}
                      alt="product-photo-preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center font-semibold">
                      <FileIcon />
                      <span>Click to add photo</span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 cursor-pointer opacity-0"
                    onChange={handlePhotoChange(setProductPhoto)}
                  />
                </div>
              </div>
            </FormItem>
            <div className="flex justify-end">
              <Button type="submit" form="create-product-form" variant="fill" className="mt-8">
                Add Product
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
