const WORDS_PER_MINUTE = 500

export function getReadingTime(content?: string) {
  if (!content) return

  const clean = content.replace(/<\/?[^>]+(>|$)/g, '')
  const numberOfWords = clean.length

  return Math.ceil(numberOfWords / WORDS_PER_MINUTE)
}
