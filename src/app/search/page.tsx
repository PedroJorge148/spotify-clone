import getSongsByTitle from '@/actions/get-songs-by-title'
import { Header } from '@/components/header'
import { SearchInput } from '@/components/search-input'
import { SearchContent } from './components/search-content'

export interface SearchProps {
  searchParams: {
    title: string
  }
}

export const revalidate = 0

export default async function Search({ searchParams }: SearchProps) {
  const songs = await getSongsByTitle(searchParams.title)

  return (
    <div className="h-full w-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900">
      <Header className="from-bg-neutral-900">
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-semibold text-white">Search</h1>
          <SearchInput />
        </div>
      </Header>
      <SearchContent songs={songs} />
    </div>
  )
}
