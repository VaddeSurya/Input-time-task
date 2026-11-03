import { useCallback, useEffect, useState } from 'react'
import { getTimers, createTimer } from './api/timerApi'
import { POLL_INTERVAL } from './config'

const SERVER_DOWN = 'Could not reach the server. Is the backend running on port 3000?'

export default function useTimers() {
  const [timers, setTimers] = useState([])
  const [error, setError] = useState('')

  const refresh = useCallback(async () => {
    try {
      setTimers(await getTimers())
      setError('')
    } catch {
      setError(SERVER_DOWN)
    }
  }, [])

  useEffect(() => {
    refresh()
    const id = setInterval(refresh, POLL_INTERVAL)
    return () => clearInterval(id)
  }, [refresh])

  const addTimer = async (countdown) => {
    try {
      await createTimer(countdown)
      refresh()
      return true
    } catch (err) {
      setError(err.message === 'Failed to fetch' ? SERVER_DOWN : err.message)
      return false
    }
  }

  return { timers, error, setError, addTimer }
}