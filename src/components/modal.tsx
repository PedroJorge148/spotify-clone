import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ReactNode } from 'react'

export interface ModalProps {
  isOpen: boolean
  onChange: (setIsOpen: boolean) => void
  title: string
  description: string
  children: ReactNode
}

export function Modal({
  isOpen,
  onChange,
  title,
  description,
  children,
}: ModalProps) {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Overlay className="fixed inset-0 z-10 bg-neutral-900/90 backdrop-blur-sm" />
      <Dialog.Content className="fixed left-1/2 top-1/2 z-20 h-full max-h-full w-full -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-md border border-neutral-700 bg-neutral-800 p-6 drop-shadow-md focus:outline-none md:h-auto md:max-h-[85vh] md:w-[90vh] md:max-w-[450px]">
        <Dialog.Close asChild>
          <button
            type="button"
            onClick={() => onChange(!isOpen)}
            className="absolute right-2 top-2 inline-flex appearance-none items-center justify-center rounded-full text-neutral-400 hover:text-white focus:outline-none"
          >
            <X className="h-6 w-6 " />
          </button>
        </Dialog.Close>
        <Dialog.Title className="mb-4 text-center text-xl font-bold">
          {title}
        </Dialog.Title>
        <Dialog.Description className="mb-5 text-center text-sm leading-normal">
          {description}
        </Dialog.Description>
        <div>{children}</div>
      </Dialog.Content>
    </Dialog.Root>
  )
}
