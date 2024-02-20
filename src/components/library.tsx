'use client'

import { useUser } from '@/hooks/use-user'
import { useAuthModal } from '@/hooks/use-auth-modal'
import { AudioLines, Plus } from 'lucide-react'
import { useUploadModal } from '@/hooks/use-upload-modal'
import { MediaItem } from './media-item'
import { Song } from '@/types'
import { useOnPlay } from '@/hooks/use-on-play'

interface LibraryProps {
  songs: Song[]
}

export function Library({ songs }: LibraryProps) {
  const authModal = useAuthModal()
  const uploadModal = useUploadModal()
  const { user } = useUser()

  const onPlay = useOnPlay(songs)

  function handleOpenUploadModal() {
    if (!user) {
      return authModal.onOpen()
    }
    // TODO: Check for subscription

    uploadModal.onOpen()
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-2">
          <AudioLines className="h-6 w-6 text-neutral-400" />
          <p className="font-medium text-neutral-400">Your Library</p>
        </div>

        <Plus
          onClick={handleOpenUploadModal}
          className="h-5 w-5 cursor-pointer text-neutral-400 transition hover:text-white"
        />
      </div>
      <div className="mt-4 flex flex-col gap-2 px-3">
        {songs.map((item) => {
          return (
            <MediaItem
              data={item}
              key={item.id}
              onClick={(id: string) => {
                onPlay(id)
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
