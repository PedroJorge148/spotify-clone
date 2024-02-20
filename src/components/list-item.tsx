'use client'

import { Play } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface ListItemProps {
  image: string
  name: string
  href: string
}

export function ListItem({ href, image, name }: ListItemProps) {
  const router = useRouter()

  function handleClick() {
    router.push(href)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group relative flex items-center gap-4 overflow-hidden rounded-md bg-neutral-100/20 pr-4 transition hover:bg-neutral-100/10"
    >
      <div className="relative min-h-16 min-w-16">
        <Image src={image} className="object-cover" fill alt="Like image" />
      </div>
      <p className="truncate py-5 font-medium">{name}</p>
      <div className="absolute right-5 flex items-center justify-center rounded-full bg-green-500 p-4 opacity-0 drop-shadow-md transition hover:scale-110 group-hover:opacity-100">
        <Play className="h-6 w-6 fill-black text-black" />
      </div>
    </button>
  )
}
