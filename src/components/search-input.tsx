'use client'

import { useDebounce } from '@/hooks/use-debounce'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import qs from 'query-string'
import Input from './form/input'

export function SearchInput() {
  const router = useRouter()
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce<string>(value)

  useEffect(() => {
    const query = {
      title: debouncedValue,
    }

    const url = qs.stringifyUrl({
      url: '/search',
      query,
    })

    router.push(url)
  }, [debouncedValue, router])

  return (
    <Input
      placeholder="What do you wanto to listen to?"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}
