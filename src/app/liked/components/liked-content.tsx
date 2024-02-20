'use client'

import { LikeButton } from '@/components/like-button'
import { MediaItem } from '@/components/media-item'
import { useOnPlay } from '@/hooks/use-on-play'
import { useUser } from '@/hooks/use-user'
import { Song } from '@/types'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export interface LikedContentProps {
  songs: Song[]
}

export function LikedContent({ songs }: LikedContentProps) {
  const { isLoading, user } = useUser()
  const router = useRouter()
  const onPlay = useOnPlay(songs)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/')
    }
  }, [isLoading, user, router])

  if (songs.length === 0) {
    return <div className="px-6 text-neutral-400">No songs found.</div>
  }

  return (
    <div className="flex w-full flex-col gap-2 p-6">
      {songs.map((song) => (
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
      ))}
    </div>
  )
}
