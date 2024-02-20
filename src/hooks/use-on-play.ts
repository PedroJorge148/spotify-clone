import { Song } from '@/types'
import { usePlayer } from './use-player'
import { useAuthModal } from './use-auth-modal'
import { useUser } from './use-user'
import { useSubscribeModal } from './use-subscriber-modal'

export function useOnPlay(songs: Song[]) {
  const player = usePlayer()
  const authModal = useAuthModal()
  const { user, subscription } = useUser()

  const subscribeModal = useSubscribeModal()

  function onPlay(id: string) {
    if (!user) {
      return authModal.onOpen()
    }

    if (!subscription) {
      return subscribeModal.onOpen()
    }

    player.setId(id)
    player.setIds(songs.map((song) => song.id))
  }

  return onPlay
}
