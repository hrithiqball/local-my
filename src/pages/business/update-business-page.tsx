import { getBusiness } from '@/api/business'
import TimeRangeRow from '@/components/business/time-range-row'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCaption } from '@/components/ui/table'
import ErrorPage from '@/pages/error-page'
import LoadingPage from '@/pages/loading-page'
import { UpdateBusiness } from '@/types/business'
import { UpdateBusinessSchema } from '@/validation/business'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { CaseSensitive, Clock, Globe, Mail, Milestone, Phone } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
export default function UpdateBusinessPage() {
  const { businessId } = useParams()
  // const queryClient = useQueryClient()

  if (!businessId) return <Navigate to="/" replace />

  const [sameWeekdayHour, setSameWeekdayHour] = useState(false)
  const [sameWeekendHour, setSameWeekendHour] = useState(false)

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['business', businessId],
    queryFn: () => getBusiness(businessId)
  })

  // const mutation = useMutation({
  //   mutationFn: updateBusiness,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['user-business', userId] })
  //     toast.success('Business created successfully')
  //   },
  //   onError: err => {
  //     if (err instanceof Error) {
  //       toast.error(err.message)
  //       return
  //     }

  //     toast.error('An unknown error occurred. Please try again.')
  //   }
  // })

  const form = useForm<UpdateBusiness>({
    resolver: zodResolver(UpdateBusinessSchema),
    defaultValues: {
      name: '',
      address: '',
      email: '',
      phone: '',
      website: '',
      allowWhatsApp: false
    }
  })

  const timeIntervals: string[] = []
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  const weekends = ['Saturday', 'Sunday']

  const [timeRanges, setTimeRanges] = useState<Record<string, { start: string; end: string }>>({
    Weekday: { start: '11:00', end: '19:00' },
    Weekend: { start: '11:00', end: '21:00' },
    'Public Holiday': { start: '11:00', end: '19:00' }
  })

  function handleTimeChange(day: string, start: string, end: string) {
    setTimeRanges(prev => ({
      ...prev,
      [day]: { start, end }
    }))
  }

  for (let hour = 0; hour <= 24; hour++) {
    const formattedHour = hour.toString().padStart(2, '0')
    const formattedMinutes = hour % 2 === 0 ? '00' : '30'

    const time = `${formattedHour}:${formattedMinutes}`

    timeIntervals.push(time)
  }

  useEffect(() => {
    if (data) {
      form.reset(data)
    }
  }, [data])

  function onSubmit(values: UpdateBusiness) {
    console.log(timeRanges)
    console.log(values)

    toast.info('Update business is not implemented yet')

    // mutation.mutate({ ...values, businessHour: timeRanges })
  }

  if (isLoading) return <LoadingPage />
  if (isError || !data) return <ErrorPage message={data ? error.message : 'No data received'} />

  return (
    <div className="mb-8 flex justify-center">
      <Form {...form}>
        <form
          id="update-business-form"
          className="w-full max-w-md space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center space-x-2">
                  <CaseSensitive className="size-4" />
                  <span>Name</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="My Awesome Business" {...field} />
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
                <FormLabel className="flex items-center space-x-2">
                  <Mail className="size-4" />
                  <span>Email</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="megah@holding.my" {...field} />
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
                <FormLabel className="flex items-center space-x-2">
                  <Phone className="size-4" />
                  <span>Phone</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="01987654321" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="allowWhatsApp"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-4">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Allow Whatsapp Link</FormLabel>
                  <FormDescription>
                    Auto created Whatsapp link for ease of contact by customer
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center space-x-2">
                  <Globe className="size-4" />
                  <span>Website</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="https://not-localhost.com.my" {...field} />
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
                <FormLabel className="flex items-center space-x-2">
                  <Milestone className="size-4" />
                  <span>Address</span>
                </FormLabel>
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
          <div className="flex items-center space-x-2">
            <Clock className="size-4" />
            <Label>Business Hour</Label>
          </div>
          <div className="flex items-center space-x-4">
            <Checkbox
              id="same-weekday"
              checked={sameWeekdayHour}
              onCheckedChange={() => setSameWeekdayHour(!sameWeekdayHour)}
            />
            <Label htmlFor="same-weekday">Same business hour on weekday</Label>
          </div>
          <div className="flex items-center space-x-4">
            <Checkbox
              id="same-weekend"
              checked={sameWeekendHour}
              onCheckedChange={() => setSameWeekendHour(!sameWeekendHour)}
            />
            <Label htmlFor="same-weekend">Same business hour on weekend</Label>
          </div>
          <Table>
            <TableCaption>Business Working Hour</TableCaption>
            <TableBody>
              {sameWeekdayHour ? (
                <TimeRangeRow
                  label="Weekday"
                  initialStart={timeRanges.Weekday.start}
                  initialEnd={timeRanges.Weekday.end}
                  onTimeChange={(start, end) => handleTimeChange('Weekday', start, end)}
                />
              ) : (
                weekdays.map(day => (
                  <TimeRangeRow
                    key={`wd-${day}`}
                    label={day}
                    initialStart={timeRanges.Weekday.start}
                    initialEnd={timeRanges.Weekday.end}
                    onTimeChange={(start, end) => handleTimeChange(day, start, end)}
                  />
                ))
              )}
              {sameWeekendHour ? (
                <TimeRangeRow
                  label="Weekend"
                  initialStart={timeRanges.Weekend.start}
                  initialEnd={timeRanges.Weekend.end}
                  onTimeChange={(start, end) => handleTimeChange('Weekend', start, end)}
                />
              ) : (
                weekends.map(day => (
                  <TimeRangeRow
                    key={`we-${day}`}
                    label={day}
                    initialStart={timeRanges.Weekend.start}
                    initialEnd={timeRanges.Weekend.end}
                    onTimeChange={(start, end) => handleTimeChange(day, start, end)}
                  />
                ))
              )}
              <TimeRangeRow
                label="Public Holiday"
                initialStart={timeRanges['Public Holiday'].start}
                initialEnd={timeRanges['Public Holiday'].end}
                onTimeChange={(start, end) => handleTimeChange('Public Holiday', start, end)}
              />
            </TableBody>
          </Table>
          <div className="flex justify-end">
            <Button className="mt-8" type="submit" variant="fill">
              Update
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
