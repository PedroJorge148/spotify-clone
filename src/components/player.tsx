'use client'

import { useGetSongById } from '@/hooks/use-get-song-by-id'
import { useLoadSongUrl } from '@/hooks/use-load-song-url'
import { usePlayer } from '@/hooks/use-player'
import { PlayerContent } from './player-content'

// export interface PlayerProps {}

export function Player() {
  const player = usePlayer()
  const { song } = useGetSongById(player.activeId)

  const songUrl = useLoadSongUrl(song!)

  if (!song || !songUrl || !player.activeId) {
    return null
  }

  return (
    <div className="fixed bottom-0 h-20 w-full bg-black px-4 py-2">
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  )
}
