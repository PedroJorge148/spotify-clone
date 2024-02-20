import { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface BoxProps extends ComponentProps<'div'> {
  children: ReactNode
}

export function Box({ children, className, ...props }: BoxProps) {
  return (
    <div
      className={twMerge(`h-fit w-full rounded-lg bg-neutral-900`, className)}
      {...props}
    >
      {children}
    </div>
  )
}
