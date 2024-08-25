import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/store/authStore'
import { login } from '@/api/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export default function Login() {
  const setToken = useAuthStore.use.setToken()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema)
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    toast.promise(login(JSON.stringify(values)), {
      loading: 'Logging in...',
      success: token => {
        setToken(token)
        navigate('/')
        return 'Login successful'
      },
      error: err => {
        if (err instanceof Error) {
          return err.message
        }

        return err
      }
    })
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form id="login-form" className="mb-4 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="abc@laypark.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-12">
          <div className="flex w-full justify-between">
            <Button variant="link" asChild>
              <Link to="/forgot-password">Forgot password?</Link>
            </Button>
            <Button form="login-form" type="submit" variant="fill">
              Login
            </Button>
          </div>
          <div className="flex flex-col space-y-4">
            <Button variant="link">
              <Link to="/register">Don't have an account?</Link>
            </Button>
            <span className="text-center text-sm">
              By signing up, you acknowledge that you agree to our{' '}
              <a className="underline-offset-4 hover:underline" href="/services-policy">
                Services
              </a>{' '}
              and{' '}
              <a className="underline-offset-4 hover:underline" href="/privacy-policy">
                Privacy Policy
              </a>
              .
            </span>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
