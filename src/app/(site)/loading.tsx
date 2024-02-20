'use client'

import { Box } from '@/components/box'
import { Loader } from 'lucide-react'

export default function Loading() {
  return (
    <Box className="flex h-full items-center justify-center">
      <Loader className="mx-auto h-6 w-6 animate-spin" />
    </Box>
  )
}
