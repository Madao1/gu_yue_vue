export function isCurrentSnapshot(snapshot) {
  if (!snapshot || typeof snapshot !== 'object') {
    return false
  }

  const hasValidPart = value => value === null || (typeof value === 'object' && !Array.isArray(value))
  return hasValidPart(snapshot.environment) && hasValidPart(snapshot.devices)
}

export async function getCurrentSnapshot() {
  const res = await fetch('/api/environment/current')

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

  if (!isCurrentSnapshot(body.data)) {
    throw new Error('暂无有效环境数据')
  }

  return body.data
}

export async function toggleDevice(deviceKey) {
  const res = await fetch(`/api/environment/devices/${encodeURIComponent(deviceKey)}/toggle`, {
    method: 'POST'
  })

  const body = await res.json()

  if (!res.ok || !body || body.code !== 200) {
    throw new Error(body && body.message ? body.message : `请求失败：HTTP ${res.status}`)
  }

  if (!body.data || typeof body.data !== 'object' || Array.isArray(body.data)) {
    throw new Error('设备状态响应格式不正确')
  }

  return body.data
}
