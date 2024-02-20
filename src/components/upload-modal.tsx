import { useUploadModal } from '@/hooks/use-upload-modal'
import { Modal } from './modal'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Button } from './button'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUser } from '@/hooks/use-user'
import uniqid from 'uniqid'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import Input from './form/input'

const uploadSchema = z.object({
  title: z.string(),
  author: z.string(),
  song: z.any(),
  image: z.any(),
})

type UploadSchemaInputs = z.infer<typeof uploadSchema>

export function UploadModal() {
  const [isLoading, setIsLoading] = useState(false)
  const { isOpen, onClose } = useUploadModal()
  const { user } = useUser()
  const supabaseClient = useSupabaseClient()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm<UploadSchemaInputs>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      author: '',
      title: '',
      song: undefined,
      image: undefined,
    },
  })

  function onChange(open: boolean) {
    if (!open) {
      reset()

      onClose()
    }
  }

  async function onUploadSubmit(data: UploadSchemaInputs) {
    try {
      setIsLoading(true)

      if (!data.image || !data.song || !user) {
        toast.error('Missing fields')
        return null
      }

      const uniqueId = uniqid()

      // Upload song
      const { data: songData, error: songError } = await supabaseClient.storage
        .from('songs')
        .upload(`song-${data.title}-${uniqueId}`, data.song[0], {
          cacheControl: '3600',
          upsert: false,
        })

      if (songError) {
        setIsLoading(false)
        return toast.error('Failed song upload.')
      }

      // Upload image
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from('images')
          .upload(`image-${data.title}-${uniqueId}`, data.image[0], {
            cacheControl: '3600',
            upsert: false,
          })

      if (imageError) {
        setIsLoading(false)
        return toast.error('Failed image upload.')
      }

      const { error: supabaseError } = await supabaseClient
        .from('songs')
        .insert({
          user_id: user.id,
          title: data.title,
          author: data.author,
          image_path: imageData.path,
          song_path: songData.path,
        })

      if (supabaseError) {
        setIsLoading(false)
        return toast.error(supabaseError.message)
      }

      router.refresh()
      setIsLoading(false)
      toast.success('Song created!')

      reset()
      onClose()
    } catch (err) {
      toast.error('Something went wrong.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      title="Add a song"
      description="Upload a mp3 file"
      isOpen={isOpen}
      onChange={onChange} // eslint-disable-line
    >
      <form onSubmit={handleSubmit(onUploadSubmit)} className="space-y-4">
        <Input
          id="title"
          disabled={isLoading}
          placeholder="Song title"
          {...register('title')}
          autoFocus
        />
        <Input
          id="author"
          disabled={isLoading}
          placeholder="Song author"
          {...register('author')}
        />
        <div>
          <div className="pb-1">Select a song file</div>
          <Input
            id="song"
            type="file"
            disabled={isLoading}
            accept=".mp3"
            {...register('song')}
          />
        </div>
        <div>
          <div className="pb-1">Select an image</div>
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register('image')}
          />
        </div>
        <Button title="Create" disabled={isLoading} type="submit" />
      </form>
    </Modal>
  )
}
