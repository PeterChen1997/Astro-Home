import useAxios from 'axios-hooks'
import { useEffect } from 'react'

const ViewedCount = ({ postId }: { postId: string }) => {
  const [{ data }, fetch] = useAxios<{ viewCount: number }>(
    {
      url: 'https://eastasia.azure.data.mongodb-api.com/app/application-0-etshh/endpoint/article/view',
      method: 'POST',
      data: {
        postId
      }
    },
    {
      manual: true
    }
  ) ?? [{}]

  useEffect(() => {
    fetch()
  }, [fetch])

  const viewedCount = data?.viewCount
  console.log(data)

  return <p>Viewed: {viewedCount ? `${viewedCount} times` : 'loading...'}</p>
}
export default ViewedCount
