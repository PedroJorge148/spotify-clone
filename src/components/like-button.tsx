import { useAuthModal } from '@/hooks/use-auth-modal'
import { useUser } from '@/hooks/use-user'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ComponentProps, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export interface LikeButtonProps extends ComponentProps<'button'> {
  songId: string
}

export function LikeButton({ songId }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false)

  const { supabaseClient } = useSessionContext()
  const { onOpen } = useAuthModal()
  const { user } = useUser()

  const router = useRouter()

  useEffect(() => {
    if (!user?.id) {
      return undefined
    }

    async function fetchData() {
      const { data, error } = await supabaseClient
        .from('liked_songs')
        .select('*')
        .eq('user_id', user!.id)
        .eq('song_id', songId)
        .single()

      if (!error && data) {
        setIsLiked(true)
      }
    }

    fetchData()
  }, [songId, supabaseClient, user])

  async function handleLike() {
    if (!user) {
      return onOpen()
    }

    if (isLiked) {
      const { error } = await supabaseClient
        .from('liked_songs')
        .delete()
        .eq('song_id', songId)
        .eq('user_id', user.id)

      if (error) {
        return toast.error(error.message)
      }

      setIsLiked(false)
    } else {
      const { error } = await supabaseClient.from('liked_songs').insert({
        song_id: songId,
        user_id: user.id,
      })

      if (error) {
        return toast.error(error.message)
      }

      setIsLiked(true)
      toast.success('Song liked!')
    }

    router.refresh()
  }

  return (
    <button
      type="button"
      onClick={handleLike}
      className="transition hover:opacity-75"
    >
      <Heart
        className={`h-5 w-5 ${isLiked ? 'text-[#22C55E]' : 'text-white'}`}
        fill={isLiked ? '#22C55E' : ''}
      />
    </button>
  )
}
