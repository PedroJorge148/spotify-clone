import { Song } from '@/types'
import { MediaItem } from './media-item'
import { LikeButton } from './like-button'
import {
  Play,
  Pause,
  StepBack,
  StepForward,
  VolumeX,
  Volume2,
} from 'lucide-react'
import { Slider } from './slider'
import { usePlayer } from '@/hooks/use-player'
import { useEffect, useState } from 'react'
import useSound from 'use-sound'

export interface PlayerContentProps {
  song: Song
  songUrl: string
}

export function PlayerContent({ song, songUrl }: PlayerContentProps) {
  const player = usePlayer()
  const [volume, setVolume] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)

  const Icon = isPlaying ? Pause : Play
  const VolumeIcon = volume === 0 ? VolumeX : Volume2

  function onPlayPrevious() {
    if (player.ids.length === 0) {
      return null
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId)
    const previousSong = player.ids[currentIndex - 1]

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1])
    }

    player.setId(previousSong)
  }

  function onPlayNext() {
    if (player.ids.length === 0) {
      return null
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId)
    const nextSong = player.ids[currentIndex + 1]

    if (!nextSong) {
      return player.setId(player.ids[0])
    }

    player.setId(nextSong)
  }

  const [play, { pause, sound }] = useSound(songUrl, {
    volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false), onPlayNext() // eslint-disable-line
    },
    onpause: () => setIsPlaying(false),
    format: ['mp3'],
  })

  useEffect(() => {
    sound?.play()

    return () => {
      sound?.unload()
    }
  }, [sound])

  function handlePlay() {
    if (!isPlaying) {
      play()
    } else {
      pause()
    }
  }

  function toggleMute() {
    if (volume === 0) {
      setVolume(1)
    } else {
      setVolume(0)
    }
  }

  return (
    <div className="grid h-full grid-cols-2 md:grid-cols-3">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>
      <div className="col-auto flex w-full items-center justify-end md:hidden">
        <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white p-1">
          <Icon
            strokeWidth={0}
            onClick={handlePlay}
            className="h-6 w-6 fill-black text-black"
          />
        </div>
      </div>
      <div className="hidden h-full w-full max-w-[722px] items-center justify-center gap-6 md:flex">
        <StepBack
          onClick={onPlayPrevious}
          className="h-6 w-6 cursor-pointer text-neutral-400 transition hover:text-white"
        />
        <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white p-1">
          <Icon
            strokeWidth={0}
            onClick={handlePlay}
            className="h-6 w-6 fill-black text-black"
          />
        </div>
        <StepForward
          onClick={onPlayNext}
          className="h-6 w-6 cursor-pointer text-neutral-400 transition hover:text-white"
        />
      </div>

      <div className="hidden w-full justify-end pr-2 md:flex">
        <div className="flex w-[120px] items-center gap-2">
          <VolumeIcon onClick={toggleMute} className="h-7 w-7 cursor-pointer" />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  )
}
