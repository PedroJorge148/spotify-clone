import Link from 'next/link'
import { ElementType } from 'react'
import { twMerge } from 'tailwind-merge'

export interface SidebarItemProps {
  icon: ElementType
  label: string
  active?: boolean
  href: string
}

export function SidebarItem({
  label,
  active,
  href,
  icon: Icon,
}: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={twMerge(
        `flex h-auto w-full cursor-pointer flex-row items-center gap-4 py-1 text-base font-medium text-neutral-400 transition hover:text-white`,
        active && 'text-white',
      )}
    >
      <Icon className="h-6 w-6" />
      <p className="w-full truncate">{label}</p>
    </Link>
  )
}
