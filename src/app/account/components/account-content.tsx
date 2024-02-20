'use client'

import { Button } from '@/components/button'
import { useSubscribeModal } from '@/hooks/use-subscriber-modal'
import { useUser } from '@/hooks/use-user'
import { postData } from '@/libs/helpers'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export function AccountContent() {
  const router = useRouter()
  const subscribeModal = useSubscribeModal()
  const { isLoading, subscription, user } = useUser()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/')
    }
  }, [isLoading, user, router])

  async function redirectToCustomerPortal() {
    setLoading(true)
    try {
      const { url, error } = await postData({
        url: '/api/create-portal-link',
      })

      window.location.assign(url)
    } catch (error) {
      toast.error((error as Error).message)
    }
    setLoading(false)
  }

  return (
    <div className="mb-7 px-6">
      {!subscription && (
        <div className="flex flex-col gap-4">
          <p>No active plan.</p>
          <Button
            title="Subscribe"
            onClick={subscribeModal.onOpen}
            className="w-[300px]"
          />
        </div>
      )}
      {subscription && (
        <div className="flex flex-col gap-4">
          <p>
            You are currently on the{' '}
            <b>{subscription?.prices?.products?.name}</b> plan
          </p>
          <Button
            title="Open customer portal"
            disabled={loading || isLoading}
            onClick={redirectToCustomerPortal}
            className="w-[300px]"
          />
        </div>
      )}
    </div>
  )
}
