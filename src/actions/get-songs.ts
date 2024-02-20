import { Song } from '@/types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function getSongs() {
  const supabase = createServerComponentClient({
    cookies,
  })

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.log(error)
  }

  return (data as Song[]) || []
}
