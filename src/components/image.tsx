import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

import { BASE_API_URL } from '@/lib/constants'

type ImageProps = {
  alt: string
  className?: string
  src: string
}

export function Image({ alt, className, src }: ImageProps) {
  const mergedClassNames = twMerge(clsx('object-contain', className))

  return <img src={`${BASE_API_URL}/${src}`} alt={alt} className={mergedClassNames} />
}
