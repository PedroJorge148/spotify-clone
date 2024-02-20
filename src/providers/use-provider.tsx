'use client'

import { UserContextProvider } from '@/hooks/use-user'
import { ReactNode } from 'react'

interface UserProviderProps {
  children: ReactNode
}

export function UserProvider({ children }: UserProviderProps) {
  return <UserContextProvider>{children}</UserContextProvider>
}
