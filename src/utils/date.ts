export function dateFormatter(date: string | Date) {
  if (!date) {
    return ''
  }

  const dateObj = typeof date === 'string' ? new Date(date) : date
  const formatter = new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })
  return formatter.format(dateObj)
}

export function extractHourFromISO(dateString?: string | null): string {
  if (typeof dateString !== 'string') return ''
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return ''

  const hour = date.getHours().toString().padStart(2, '0')
  const minute = date.getMinutes().toString().padStart(2, '0')

  return `${hour}.${minute}`
}
