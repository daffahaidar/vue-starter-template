export function toRupiah(value?: string | number | null): string {
  if (value === null || value === undefined) return ''

  let numberValue: number
  if (typeof value === 'string') {
    numberValue = parseFloat(value.replace(/,/g, ''))
  } else {
    numberValue = value
  }

  if (isNaN(numberValue)) return ''

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numberValue)
}

export function toUSD(value?: string | number | null): string {
  if (value === null || value === undefined) return ''

  let numberValue: number
  if (typeof value === 'string') {
    numberValue = parseFloat(value.replace(/,/g, ''))
  } else {
    numberValue = value
  }

  if (isNaN(numberValue)) return ''

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numberValue)
}
