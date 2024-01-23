import { Button, message } from 'antd'
import useAxios from 'axios-hooks'
import { useEffect, useState } from 'react'
import { isClientSide } from '../utils'

const Subscribe = () => {
  const [email, setEmail] = useState('')
  const [{ data, loading }, execute] = isClientSide()
    ? useAxios(
        {
          url: `https://n8nn.zeabur.app/webhook/blog-subscribe`,
          method: 'GET'
        },
        {
          manual: true
        }
      )
    : ([{}, () => {}] as any)

  useEffect(() => {
    if (data?.success === undefined) {
      return
    }

    if (data?.success) {
      message.success('订阅成功~')
    } else {
      message.error('订阅失败，看看邮箱对不对呢')
    }
  }, [data])

  const handleClick = () => {
    execute({
      params: {
        email
      }
    })
  }

  return (
    <div className="max-w-2xl rounded-md mx-auto p-3 mb-10 border dark:bg-gray-800 bg-orange-100 flex flex-col items-center">
      <div className="my-1 text-xl">📰 邮箱订阅 📰</div>
      <div className="my-1">不错过每篇更新~</div>
      <input
        className="w-[200px] border py-1 px-2 m-1 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
        placeholder="peter@mail.com"
        onChange={e => setEmail(e.target.value)}
      />

      <Button
        className="block w-[200px] rounded-xl bg-slate-950 text-white m-2 py-1 px-4 dark:hover:bg-slate-900 hover:bg-slate-700 hover:text-white"
        style={{ borderColor: 'transparent', color: 'white' }}
        loading={loading}
        onClick={handleClick}
      >
        提交
      </Button>
    </div>
  )
}
export default Subscribe
