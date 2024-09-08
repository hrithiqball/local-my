import { getProduct, updateProduct } from '@/api/product'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import ErrorComponent from '@/components/error'
import LoadingComponent from '@/components/loading'
import Header from '@/components/ui/header'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Boxes, DollarSign, FileText, Package, Tag } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { UpdateProduct, UpdateProductInput } from '@/types/product'
import { UpdateProductSchema } from '@/validation/product'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function ProductEditPage() {
  const { id } = useParams()
  const queryClient = useQueryClient()

  const {
    data: product,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id ?? ''),
    enabled: Boolean(id)
  })

  const updateBusinessMutation = useMutation({
    mutationFn: (input: UpdateProductInput) => updateProduct(input.id, input.formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product', id] })
      toast.success('Product updated successfully')
    },
    onError: err => {
      if (err instanceof Error) {
        toast.error(err.message)
        return
      }

      toast.error('An unknown error occurred. Please try again.')
    }
  })

  const form = useForm<UpdateProduct>({
    resolver: zodResolver(UpdateProductSchema)
  })

  useEffect(() => {
    if (product) {
      form.reset(product)
    }
  }, [product, form])

  if (isLoading) return <LoadingComponent />
  if (isError || !product)
    return <ErrorComponent message={!product ? 'No data received' : error.message} />

  function onSubmit(values: UpdateProduct) {
    if (!id) return

    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('description', values.description ?? '')
    formData.append('price', String(values.price))
    formData.append('stock', String(values.stock))
    formData.append('type', values.type ?? '')

    updateBusinessMutation.mutate({ id, formData })
  }

  return (
    <div className="flex flex-col space-y-8">
      <Header title={product.name} description={product.description ?? 'No description provided'} />
      <div className="flex justify-center">
        <Form {...form}>
          <form
            id="update-product-form"
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
                    <Input placeholder="My amazing product" {...field} />
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
            <div className="flex justify-end">
              <Button type="submit" form="update-product-form" variant="fill" className="mt-8">
                Update Product
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
