import { ComponentProps, ElementType } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ComponentProps<'button'> {
  title: string
  icon?: ElementType
  iconClass?: string
}

export function Button({
  title,
  className,
  icon: Icon,
  iconClass,
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        'w-full rounded-full border border-transparent bg-emerald-500 p-3 font-bold text-black transition hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50 ',
        className,
      )}
      {...props}
    >
      {Icon && <Icon className={twMerge('h-5 w-6', iconClass)} />}
      {title}
    </button>
  )
}
