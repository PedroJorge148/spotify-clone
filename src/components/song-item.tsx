'use client'

import Image from 'next/image'
import { PlayButton } from './play-button'
import { Song } from '@/types'
import { useLoadImage } from '@/hooks/use-load-image'

interface SongItemProps {
  data: Song
  onClick: (id: string) => void
}

export function SongItem({ data, onClick }: SongItemProps) {
  const imagePath = useLoadImage(data)

  return (
    <div
      onClick={() => onClick(data.id)}
      className="group relative flex cursor-pointer flex-col items-center justify-center gap-4 overflow-hidden rounded-md bg-neutral-400/5 p-3 transition hover:bg-neutral-400/10"
    >
      <div className="relative aspect-square h-full w-full overflow-hidden rounded-md">
        <Image
          src={imagePath || '/images/liked.png'}
          className="object-cover"
          priority={false}
          alt=""
          fill
        />
      </div>
      <div className="flex w-full flex-col items-start gap-1 p-2">
        <p className="w-full truncate font-semibold">{data.title}</p>
        <p className="w-full truncate text-sm text-neutral-400">
          By {data.author}
        </p>
      </div>
      <div className="absolute bottom-24 right-5">
        <PlayButton />
      </div>
    </div>
  )
}
