import { Play } from 'lucide-react'

// export interface PlayButtonProps {}

export function PlayButton() {
  return (
    <button className="flex translate-y-1/4 items-center justify-center rounded-full bg-emerald-500 p-4 opacity-0 drop-shadow-md transition hover:scale-110 group-hover:translate-y-0 group-hover:opacity-100">
      <Play className="h-4 w-4 fill-black text-black" />
    </button>
  )
}
