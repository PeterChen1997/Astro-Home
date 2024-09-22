import useAxios from 'axios-hooks'

import { isClientSide } from '../utils'

const ViewedCount = ({ postId }: { postId: string }) => {
  const [{ data }] =
    isClientSide() && import.meta.env.MODE !== 'development'
      ? useAxios({
          url: `https://n8n.peterchen97.cn/webhook/444299a4-c5bf-4a75-a628-f827196e4033/blog/view/${postId}`,
          method: 'GET'
        })
      : ([{}, () => {}] as any)
  const viewedCount = data?.viewCount

  return <p>Viewed: {viewedCount ? `${viewedCount} times` : 'loading...'}</p>
}
export default ViewedCount
