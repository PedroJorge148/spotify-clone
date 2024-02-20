import { useLoadImage } from '@/hooks/use-load-image'
import { Song } from '@/types'
import Image from 'next/image'

export interface MediaItemProps {
  data: Song
  onClick?: (id: string) => void
}

export function MediaItem({ data, onClick }: MediaItemProps) {
  const imageUrl = useLoadImage(data)

  function handleClick() {
    if (onClick) {
      return onClick(data.id)
    }

    // TODO: Default turn on player
  }

  return (
    <div
      onClick={handleClick}
      className="flex w-full cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-neutral-800/50"
    >
      <div className="relative min-h-12 min-w-12 overflow-hidden rounded-md">
        <Image
          src={imageUrl || '/images/liked.png'}
          className="object-cover "
          alt="Media Item"
          priority={false}
          fill
        />
      </div>
      <div className="flex flex-col gap-1 overflow-hidden">
        <p className="truncate text-white">{data.title}</p>
        <p className="truncate text-sm text-neutral-400">{data.author}</p>
      </div>
    </div>
  )
}
