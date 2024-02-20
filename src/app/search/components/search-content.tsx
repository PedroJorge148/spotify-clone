'use client'

import { LikeButton } from '@/components/like-button'
import { MediaItem } from '@/components/media-item'
import { useOnPlay } from '@/hooks/use-on-play'
import { Song } from '@/types'

export interface SearchContentProps {
  songs: Song[]
}

export function SearchContent({ songs }: SearchContentProps) {
  const onPlay = useOnPlay(songs)

  if (songs.length === 0) {
    return <div className="px-6 text-neutral-400">No songs found.</div>
  }

  return (
    <div className="flex w-full flex-col gap-2 px-6">
      {songs.map((song) => {
        return (
          <div key={song.id} className="flex w-full items-center gap-4">
            <div className="flex-1">
              <MediaItem
                data={song}
                onClick={(id: string) => {
                  onPlay(id)
                }}
              />
            </div>
            <LikeButton songId={song.id} />
          </div>
        )
      })}
    </div>
  )
}
