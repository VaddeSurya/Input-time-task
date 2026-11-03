import React from 'react'
import TimerItem from './TimerItem'

const TimerList = ({ timers }) => {
  if (timers.length === 0) {
    return <p className='mt-6 text-gray-500'>No timers yet.</p>
  }

  return (
    <ul className='mt-6 space-y-2'>
      {timers.map((t) => (
        <TimerItem key={t.timer_id} timer={t} />
      ))}
    </ul>
  )
}

export default TimerList