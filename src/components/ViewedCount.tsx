import useAxios from 'axios-hooks'
import { isClientSide } from '../utils'

const ViewedCount = ({ postId }: { postId: string }) => {
  const [{ data }] = isClientSide()
    ? useAxios({
        url: 'https://eastasia.azure.data.mongodb-api.com/app/application-0-etshh/endpoint/article/view',
        method: 'POST',
        data: {
          postId
        }
      })
    : ([{}, () => {}] as any)
  const viewedCount = data?.viewCount
  console.log(data)

  return <p>Viewed: {viewedCount ? `${viewedCount} times` : 'loading...'}</p>
}
export default ViewedCount
