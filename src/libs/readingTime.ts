const WORDS_PER_MINUTE = 500

export function getReadingTime(content?: string) {
  if (!content) return

  const clean = content.replace(/<\/?[^>]+(>|$)/g, '')
  const numberOfWords = clean.length

  return Math.ceil(numberOfWords / WORDS_PER_MINUTE)
}

// 列表元信息用：算不出来（如 MDX 没有 compiledContent）时返回空串，由调用方过滤掉
export function readingTimeLabel(content?: string) {
  const minutes = getReadingTime(content)
  return minutes ? `约 ${minutes} 分钟` : ''
}
