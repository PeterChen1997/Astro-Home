import useAxios from 'axios-hooks'
import { FaUsers } from 'react-icons/fa/index.js'

import { isClientSide } from '../utils'

const VisitedCount = () => {
  const [{ data }] =
    isClientSide() && import.meta.env.MODE !== 'development'
      ? useAxios({
          url: `https://n8nn.zeabur.app/webhook/visit`,
          method: 'GET'
        })
      : ([{}, () => {}] as any)
  const viewedCount = data?.viewCount

  return (
    <div className="flex flex-row justify-center items-center gap-1">
      <FaUsers />
      {viewedCount ? viewedCount.toLocaleString('en-US') : 'loading...'}
    </div>
  )
}

export default VisitedCount
