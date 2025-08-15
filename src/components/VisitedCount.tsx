import useAxios from 'axios-hooks'
import { FaUsers, FaEye } from 'react-icons/fa/index.js'
import { useEffect, useState } from 'react'

import { isClientSide } from '../utils'

const VisitedCount = () => {
  const [shouldTrack, setShouldTrack] = useState(false)
  const [isUniqueUser, setIsUniqueUser] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [uvCount, setUvCount] = useState<number | null>(null)
  const [pvCount, setPvCount] = useState<number | null>(null)

  // 检查是否需要统计访问
  useEffect(() => {
    if (!isClientSide()) {
      setIsInitialized(true)
      return
    }

    const now = Date.now()
    const uvKey = 'site_uv_timestamp'
    const pvKey = 'site_pv_session'

    // 检查 PV（每个会话只记录一次）
    const sessionPV = sessionStorage.getItem(pvKey)

    if (!sessionPV) {
      setShouldTrack(true)
      sessionStorage.setItem(pvKey, 'tracked')

      // 检查是否是独立用户（24小时内只记录一次）
      const lastUVTime = localStorage.getItem(uvKey)
      const uvTimeThreshold = 24 * 60 * 60 * 1000 // 24小时

      if (!lastUVTime || now - parseInt(lastUVTime) > uvTimeThreshold) {
        setIsUniqueUser(true)
        localStorage.setItem(uvKey, now.toString())
      }
    }

    // 标记初始化完成
    setIsInitialized(true)
  }, [])

  // 手动模式的 axios hook
  const [{ data }, executeRequest] = useAxios(
    {
      url: `https://n8n.peterchen97.cn/webhook/visit`,
      method: 'POST'
    },
    { manual: true }
  )

  // 发送统计请求 - 确保初始化完成且需要统计时只发送一次
  useEffect(() => {
    if (
      !isInitialized ||
      !isClientSide() ||
      import.meta.env.MODE === 'development' ||
      !shouldTrack
    ) {
      return
    }

    executeRequest({
      data: {
        uniqueUser: isUniqueUser
      }
    })
  }, [isInitialized, shouldTrack, isUniqueUser, executeRequest])

  // 更新显示的数据
  useEffect(() => {
    if (data?.uvCount !== undefined) {
      setUvCount(data.uvCount)
    }
    if (data?.pvCount !== undefined) {
      setPvCount(data.pvCount)
    }
  }, [data])

  return (
    <div className="flex flex-row justify-center items-center gap-4">
      <div className="flex flex-row items-center gap-1">
        <FaUsers />
        <span title="独立访客">
          UV:{' '}
          {uvCount !== null ? uvCount.toLocaleString('en-US') : 'loading...'}
        </span>
      </div>
      <div className="flex flex-row items-center gap-1">
        <FaEye />
        <span title="页面浏览量">
          PV:{' '}
          {pvCount !== null ? pvCount.toLocaleString('en-US') : 'loading...'}
        </span>
      </div>
    </div>
  )
}

export default VisitedCount
