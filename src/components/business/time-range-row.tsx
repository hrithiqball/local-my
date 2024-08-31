import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from '@/components/ui/select'
import { useState } from 'react'
import { TableCell, TableRow } from '@/components/ui/table'

type TimeRangeRowProps = {
  label: string
  initialStart: string
  initialEnd: string
  onTimeChange: (start: string, end: string) => void
}

export default function TimeRangeRow({
  label,
  initialStart,
  initialEnd,
  onTimeChange
}: TimeRangeRowProps) {
  const [startTime, setStartTime] = useState<string>(initialStart)
  const [endTime, setEndTime] = useState<string>(initialEnd)
  const timeIntervals = Array.from({ length: 25 }, (_, i) => i.toString().padStart(2, '0') + ':00') // Generate times

  const handleStartChange = (value: string) => {
    setStartTime(value)
    onTimeChange(value, endTime)
  }

  const handleEndChange = (value: string) => {
    setEndTime(value)
    onTimeChange(startTime, value)
  }

  return (
    <TableRow>
      <TableCell>{label}</TableCell>
      <TableCell className="flex items-center text-right">
        <div className="flex flex-1 items-center justify-end">
          <Select value={startTime} onValueChange={handleStartChange}>
            <SelectTrigger className="max-w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeIntervals.map(time => (
                <SelectItem key={`start-${time}`} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="px-2">-</span>
          <Select value={endTime} onValueChange={handleEndChange}>
            <SelectTrigger className="max-w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeIntervals.map(time => (
                <SelectItem key={`end-${time}`} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </TableCell>
    </TableRow>
  )
}
