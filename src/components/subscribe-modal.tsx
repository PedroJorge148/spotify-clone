import { Price, ProductWithPrice } from '@/types'
import { Modal } from './modal'
import { Button } from './button'
import { useState } from 'react'
import { useUser } from '@/hooks/use-user'
import toast from 'react-hot-toast'
import { postData } from '@/libs/helpers'
import { getStripe } from '@/libs/stripeClient'
import { useSubscribeModal } from '@/hooks/use-subscriber-modal'

interface SubscribeModalProps {
  products: ProductWithPrice[]
}

function formatPrice(price: Price) {
  const priceString = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: price.currency,
  }).format((price.unit_amount || 0) / 100)

  return priceString
}

export function SubscribeModal({ products }: SubscribeModalProps) {
  const { user, isLoading, subscription } = useUser()
  const [priceIdLoading, setPriceIdLoading] = useState<string | undefined>('')

  const subscribeModal = useSubscribeModal()

  function onChange(open: boolean) {
    if (!open) {
      subscribeModal.onClose()
    }
  }

  async function handleCheckout(price: Price) {
    setPriceIdLoading(price.id)

    if (!user) {
      setPriceIdLoading(undefined)
      return toast.error('Must be logged in.')
    }

    if (subscription) {
      setPriceIdLoading(undefined)
      return toast('Already subscribed.')
    }

    try {
      const { sessionId } = await postData({
        url: '/api/create-checkout-session',
        data: { price },
      })

      const stripe = await getStripe()
      stripe?.redirectToCheckout({ sessionId })
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  let content = <div className="text-center">No Products available.</div>

  if (products.length) {
    content = (
      <div>
        {products.map((product) => {
          if (!product.prices?.length) {
            return <div key={product.id}>No prices available.</div>
          }

          return product.prices.map((price) => (
            <Button
              key={price.id}
              onClick={() => handleCheckout(price)}
              disabled={isLoading || price.id === priceIdLoading}
              className="mb-4"
              title={`Subscribe for ${formatPrice(price)} a ${price.interval}`}
            />
          ))
        })}
      </div>
    )
  }

  if (subscription) {
    content = <div className="text-center">Already subscribed.</div>
  }

  return (
    <Modal
      title="Only for premium users"
      description="Listen to music with Spotify Premium"
      isOpen={subscribeModal.isOpen}
      onChange={onChange}
    >
      {content}
    </Modal>
  )
}
