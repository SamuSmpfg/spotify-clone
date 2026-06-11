'use client'

import { useRouter } from "next/navigation"
import useSubscribeModal from "../../../../hooks/useSubscribeModal"
import { useUser } from "../../../../hooks/useUser"
import { useState, useEffect } from "react"
import { postData } from "../../../libs/helpers"
import { toast } from 'react-hot-toast'
import Button from "../../../components/Button"
import SubscribeModal from "../../../components/SubscribeModal"

const AccountContent = () => {
  const router = useRouter()
  const subscribeModal = useSubscribeModal()
  const { isLoading, subscription, user } = useUser()

  const [loading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/')
    }
  }, [isLoading, user, router])

  const redirectToCustomerPortal = async () => {
    setIsLoading(true);
    try {
      const { url, error } = await postData({
        url: '/api/create-portal-link'
      })
      window.location.assign(url)
    } catch (error) {
      if (error) {
        toast.error((error as Error).message)
      }
    }
    setIsLoading(false)
  }
  return (
    <div
      className='
    mb-7
    px-6
    '>
      {!subscription && (
        <div
          className="
        flex
        flex-col
        gap-y-4
        ">
          <p>
            No active plan
          </p>
          <Button
            onClick={subscribeModal.onOpen}
            className="w-[300px]"
          >
            Subscribe now!
          </Button>
        </div>
      )}

      {subscription && (
        <div
          className="
        flex
        flex-col
        gap-y-4
        ">
          <p>
            You are currently on the <b>{subscription?.prices?.products?.name}</b> plan.
          </p>
          <Button
            disabled={loading || isLoading}
            onClick={redirectToCustomerPortal}
            className='
            w-[300px]
          '>
            Open Customer Portal
          </Button>
        </div>
      )}
    </div>
  )
}

export default AccountContent