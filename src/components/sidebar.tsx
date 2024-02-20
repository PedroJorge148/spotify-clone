'use client'

import { usePathname } from 'next/navigation'
import { ReactNode, useMemo } from 'react'

import { Home, Search } from 'lucide-react'
import { Box } from './box'
import { SidebarItem } from './sidebar-item'
import { Library } from './library'
import { Song } from '@/types'
import { usePlayer } from '@/hooks/use-player'
import { twMerge } from 'tailwind-merge'

interface SidebarProps {
  children: ReactNode
  songs: Song[]
}

export function Sidebar({ children, songs }: SidebarProps) {
  const pathname = usePathname()
  const player = usePlayer()

  const routes = useMemo(
    () => [
      {
        icon: Home,
        label: 'Home',
        active: pathname !== '/search',
        href: '/',
      },
      {
        icon: Search,
        label: 'Search',
        active: pathname === '/search',
        href: '/search',
      },
    ],
    [pathname],
  )
  return (
    <div
      className={twMerge(
        'flex h-full ',
        player.activeId && 'h-[calc(100%-80px)]',
      )}
    >
      <div className="hidden h-full w-[300px] flex-col gap-2 bg-black p-2 md:flex">
        <Box>
          <div className="flex flex-col gap-4 px-5 py-4">
            {routes.map((item, i) => (
              <SidebarItem key={item.label + i} {...item} />
            ))}
          </div>
        </Box>
        <Box className="h-full overflow-y-auto">
          <Library songs={songs} />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  )
}
