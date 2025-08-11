import useAxios from 'axios-hooks'
import { FaUsers } from 'react-icons/fa/index.js'
import { useEffect, useState } from 'react'

import { isClientSide } from '../utils'

// 生成用户指纹
const generateFingerprint = (): string => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  ctx!.textBaseline = 'top'
  ctx!.font = '14px Arial'
  ctx!.fillText('Fingerprint test', 2, 2)

  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset(),
    canvas.toDataURL()
  ].join('|')

  // 简单哈希函数
  let hash = 0
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // 转换为32位整数
  }

  return Math.abs(hash).toString(36)
}

// 获取或生成用户指纹
const getUserFingerprint = (): { fingerprint: string; isNewUser: boolean } => {
  if (!isClientSide()) {
    return { fingerprint: '', isNewUser: false }
  }

  const FINGERPRINT_KEY = 'user_fingerprint'
  const existingFingerprint = localStorage.getItem(FINGERPRINT_KEY)

  if (existingFingerprint) {
    return { fingerprint: existingFingerprint, isNewUser: false }
  }

  const newFingerprint = generateFingerprint()
  localStorage.setItem(FINGERPRINT_KEY, newFingerprint)

  return { fingerprint: newFingerprint, isNewUser: true }
}

const VisitedCount = () => {
  const [userInfo, setUserInfo] = useState<{
    fingerprint: string
    isNewUser: boolean
  }>({
    fingerprint: '',
    isNewUser: false
  })

  useEffect(() => {
    if (isClientSide()) {
      setUserInfo(getUserFingerprint())
    }
  }, [])

  const [{ data }] =
    isClientSide() &&
    import.meta.env.MODE !== 'development' &&
    userInfo.fingerprint
      ? useAxios({
          url: `https://n8n.peterchen97.cn/webhook/visit`,
          method: 'GET',
          params: {
            fingerprint: userInfo.fingerprint,
            userType: userInfo.isNewUser ? 'new' : 'returning'
          }
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
