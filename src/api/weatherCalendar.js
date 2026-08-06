function isWeatherDayDetail(item) {
  return Boolean(
    item &&
    typeof item === 'object' &&
    !Array.isArray(item) &&
    Number.isInteger(item.day) &&
    typeof item.weather === 'string'
  )
}

export function isWeatherCalendarData(data) {
  return Boolean(
    data &&
    typeof data === 'object' &&
    !Array.isArray(data) &&
    Number.isInteger(data.year) &&
    Number.isInteger(data.month) &&
    typeof data.rainThreshold === 'number' &&
    Number.isFinite(data.rainThreshold) &&
    Array.isArray(data.days) &&
    data.days.every(isWeatherDayDetail)
  )
}

export async function getWeatherCalendar(year, month) {
  const params = new URLSearchParams()
  params.set('year', year)
  params.set('month', month)

  const res = await fetch(`/api/weather-calendar?${params.toString()}`)

  if (!res.ok) {
    throw new Error(`请求失败：HTTP ${res.status}`)
  }

  const body = await res.json()

  if (!body || typeof body !== 'object') {
    throw new Error('响应格式不正确')
  }

  if (body.code !== 200) {
    throw new Error(body.message || `请求失败：${body.code}`)
  }

  if (!isWeatherCalendarData(body.data)) {
    throw new Error('晴雨表数据格式不正确')
  }

  return body.data
}