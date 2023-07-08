import useAxios from 'axios-hooks'

const ViewedCount = ({ postId }: { postId: string }) => {
  const [{ data }] = useAxios(
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
  )
  const viewedCount = data?.viewCount
  console.log(data)

  return <p>Viewed: {viewedCount ? `${viewedCount} times` : 'loading...'}</p>
}
export default ViewedCount
