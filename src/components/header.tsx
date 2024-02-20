'use client'

import { useUser } from '@/hooks/use-user'
import { useAuthModal } from '@/hooks/use-auth-modal'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { ChevronLeft, ChevronRight, Home, Search, User2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ComponentProps, ReactNode } from 'react'
import toast from 'react-hot-toast'
import { Button } from './button'
import { twMerge } from 'tailwind-merge'
import { usePlayer } from '@/hooks/use-player'

interface HeaderProps extends ComponentProps<'div'> {
  children: ReactNode
}

export function Header({ children, className }: HeaderProps) {
  const authModal = useAuthModal()
  const router = useRouter()

  const supabaseClient = useSupabaseClient()
  const { user } = useUser()
  const player = usePlayer()

  async function handleLogout() {
    const { error } = await supabaseClient.auth.signOut()

    player.reset()

    router.refresh()

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Logged out!')
    }
  }

  return (
    <div
      className={twMerge(
        'h-fit bg-gradient-to-b from-emerald-800 p-6',
        className,
      )}
    >
      <div className="mb-4 flex w-full items-center justify-between">
        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center justify-center rounded-full bg-black transition hover:opacity-75"
          >
            <ChevronLeft className="h-9 w-9 text-white" />
          </button>
          <button
            type="button"
            onClick={() => router.forward()}
            className="flex items-center justify-center rounded-full bg-black transition hover:opacity-75"
          >
            <ChevronRight className="h-9 w-9 text-white" />
          </button>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            className="flex items-center justify-center rounded-full bg-white p-2 transition hover:opacity-75"
          >
            <Home className="h-5 w-5 text-black" />
          </button>
          <button
            type="button"
            className="flex items-center justify-center rounded-full bg-white p-2 transition hover:opacity-75"
          >
            <Search className="h-5 w-5 text-black" />
          </button>
        </div>
        <div className="flex items-center justify-between gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Button
                type="button"
                title="Logout"
                onClick={handleLogout}
                className="bg-white px-6 py-2"
              />
              <Button
                type="button"
                title=""
                icon={User2}
                onClick={() => router.push('/account')}
                className="bg-white"
              />
            </div>
          ) : (
            <>
              <div>
                <Button
                  type="button"
                  title="Sign up"
                  onClick={authModal.onOpen}
                  className="bg-transparent font-medium text-neutral-300"
                />
              </div>
              <div>
                <Button
                  type="button"
                  title="Log in"
                  onClick={authModal.onOpen}
                  className="bg-white px-6 py-2"
                />
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}
