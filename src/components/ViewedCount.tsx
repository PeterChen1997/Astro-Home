import { useEffect, useState } from 'react'

import { isClientSide } from '../utils'

const ViewedCount = ({ postId }: { postId: string }) => {
  const [viewedCount, setViewedCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isClientSide() || import.meta.env.MODE === 'development') {
      setLoading(false)
      return
    }

    const fetchViewCount = async () => {
      try {
        const response = await fetch(
          `https://n8n.peterchen97.cn/webhook/444299a4-c5bf-4a75-a628-f827196e4033/blog/view/${postId}`
        )

        if (response.ok) {
          const data = await response.json()
          setViewedCount(data?.viewCount || 0)
        }
      } catch (error) {
        console.error('Failed to fetch view count:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchViewCount()
  }, [postId])

  return (
    <p>
      Viewed:{' '}
      {viewedCount !== null
        ? `${viewedCount} times`
        : loading
        ? 'loading...'
        : 'unavailable'}
    </p>
  )
}
export default ViewedCount
