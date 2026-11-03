import { API_URL } from '../config'


export async function getTimers() {
  const res = await fetch(`${API_URL}/timers`)
  if (!res.ok) throw new Error('Failed to load timers')
  return res.json()
}

export async function createTimer(countdown) {
  const res = await fetch(`${API_URL}/new`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ countdown }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || 'Could not create timer')
  return data
}