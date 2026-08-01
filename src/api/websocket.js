import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
import { isCurrentSnapshot } from '@/api/environment'

export function createEnvironmentClient(callbacks = {}) {
  let client = null
  let reconnectTimer = null
  let active = false
  let attempts = 0

  function notify(name, ...args) {
    if (typeof callbacks[name] === 'function') {
      callbacks[name](...args)
    }
  }

  function scheduleReconnect() {
    if (!active || reconnectTimer) {
      return
    }

    attempts++
    const delay = Math.min(attempts * 3000, 30000)
    reconnectTimer = setTimeout(() => {
      reconnectTimer = null
      connectClient()
    }, delay)
  }

  function handleMessage(message) {
    try {
      const snapshot = JSON.parse(message.body)
      if (!isCurrentSnapshot(snapshot)) {
        notify('onError', new Error('WebSocket 消息格式不正确'))
        return
      }
      notify('onMessage', snapshot)
    } catch (error) {
      notify('onError', error)
    }
  }

  function connectClient() {
    if (!active || client) {
      return
    }

    let nextClient
    nextClient = new Client({
      webSocketFactory: () => new SockJS('/ws'),
      reconnectDelay: 0,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      onConnect: () => {
        if (client !== nextClient || !active) {
          return
        }
        attempts = 0
        notify('onConnect')
        nextClient.subscribe('/topic/environment', handleMessage)
      },
      onStompError: (frame) => {
        if (client !== nextClient) {
          return
        }
        notify('onError', new Error(`STOMP 错误：${frame.headers.message || '未知'}`))
        nextClient.deactivate()
      },
      onWebSocketError: () => {
        if (client === nextClient) {
          notify('onError', new Error('WebSocket 连接失败'))
        }
      },
      onWebSocketClose: () => {
        if (client !== nextClient) {
          return
        }
        client = null
        if (!active) {
          return
        }
        notify('onDisconnect', 'close')
        scheduleReconnect()
      }
    })

    client = nextClient
    nextClient.activate()
  }

  function start() {
    if (active) {
      return
    }
    active = true
    attempts = 0
    connectClient()
  }

  function stop() {
    active = false
    if (reconnectTimer) {
      clearTimeout(reconnectTimer)
      reconnectTimer = null
    }
    if (client) {
      const currentClient = client
      client = null
      currentClient.deactivate()
    }
  }

  return { start, stop }
}
