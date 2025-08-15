import { FaUsers, FaEye } from 'react-icons/fa/index.js'
import { useEffect, useState } from 'react'

import { isClientSide } from '../utils'

// 从 localStorage 读取缓存的访问量数据
const loadCachedCounts = () => {
  if (!isClientSide()) return { uvCount: null, pvCount: null }

  try {
    const cachedData = localStorage.getItem('site_visit_counts')
    if (cachedData) {
      const { uvCount, pvCount } = JSON.parse(cachedData)
      return { uvCount, pvCount }
    }
  } catch (error) {
    console.error('Failed to load cached visit counts:', error)
  }
  return { uvCount: null, pvCount: null }
}

// 缓存访问量数据到 localStorage
const cacheCounts = (uv: number, pv: number) => {
  if (!isClientSide()) return

  try {
    const dataToCache = {
      uvCount: uv,
      pvCount: pv
    }
    localStorage.setItem('site_visit_counts', JSON.stringify(dataToCache))
  } catch (error) {
    console.error('Failed to cache visit counts:', error)
  }
}

const VisitedCount = () => {
  const [shouldTrack, setShouldTrack] = useState(false)
  const [isUniqueUser, setIsUniqueUser] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // 初始化时同步读取缓存作为初始值
  const cachedData = loadCachedCounts()
  const [uvCount, setUvCount] = useState<number | null>(cachedData.uvCount)
  const [pvCount, setPvCount] = useState<number | null>(cachedData.pvCount)

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

  // 发送统计请求 - 确保初始化完成且需要统计时只发送一次
  useEffect(() => {
    if (!isInitialized || !isClientSide() || !shouldTrack) {
      return
    }

    const sendVisitData = async () => {
      try {
        const response = await fetch(
          'https://n8n.peterchen97.cn/webhook/visit',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              uniqueUser: isUniqueUser
            })
          }
        )

        if (response.ok) {
          const data = await response.json()
          if (data?.uvCount !== undefined && data?.pvCount !== undefined) {
            // 更新 localStorage + setState
            cacheCounts(data.uvCount, data.pvCount)
            setUvCount(data.uvCount)
            setPvCount(data.pvCount)
          }
        }
      } catch (error) {
        console.error('Failed to send visit data:', error)
      }
    }

    sendVisitData()
  }, [isInitialized, shouldTrack, isUniqueUser])

  return (
    <div className="flex flex-row justify-center items-center gap-4">
      <div className="flex flex-row items-center gap-1">
        <FaEye />
        <span title="页面浏览量">
          PV:{' '}
          {pvCount !== null ? pvCount.toLocaleString('en-US') : 'loading...'}
        </span>
      </div>
      <div className="flex flex-row items-center gap-1">
        <FaUsers />
        <span title="独立访客">
          UV:{' '}
          {uvCount !== null ? uvCount.toLocaleString('en-US') : 'loading...'}
        </span>
      </div>
    </div>
  )
}

export default VisitedCount
