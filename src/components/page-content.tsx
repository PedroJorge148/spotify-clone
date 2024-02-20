'use client'

import { Song } from '@/types'
import { SongItem } from './song-item'
import { useOnPlay } from '@/hooks/use-on-play'

interface PageContentProps {
  songs: Song[]
}

export function PageContent({ songs }: PageContentProps) {
  const onPlay = useOnPlay(songs)

  if (songs.length === 0) {
    return <div className="mt-4 text-neutral-400">No songs available.</div>
  }
  return (
    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {songs.map((song) => {
        return (
          <SongItem
            key={song.id}
            data={song}
            onClick={(id: string) => onPlay(id)}
          />
        )
      })}
    </div>
  )
}
