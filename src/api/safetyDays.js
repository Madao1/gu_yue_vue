function isNonNegativeInteger(value) {
  return Number.isInteger(value) && value >= 0
}

export function isSafetyDaysStatus(data) {
  return Boolean(
    data &&
    typeof data === 'object' &&
    !Array.isArray(data) &&
    isNonNegativeInteger(data.safetyDays) &&
    isNonNegativeInteger(data.constructionDays) &&
    isNonNegativeInteger(data.completionCountdownDays)
  )
}

export async function getSafetyDays() {
  const res = await fetch('/api/safety-days')

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

  if (!isSafetyDaysStatus(body.data)) {
    throw new Error('安全运行数据格式不正确')
  }

  return body.data
}
