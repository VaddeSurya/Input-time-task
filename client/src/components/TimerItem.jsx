import React from 'react'
import formatTime from '../utils/formatTime'

const TimerItem = ({ timer }) => {
  const done = timer.seconds_left === 0

  return (
    <li className='flex items-center gap-4 border-2 p-2 w-96 rounded-[10px]'>
      <span className='text-2xl font-mono w-20'>{formatTime(timer.seconds_left)}</span>
      <span className={done ? 'text-green-600' : 'text-gray-500'}>
        {done ? 'Done' : 'Running'}
      </span>
      <span className='text-xs text-gray-400 truncate'>{timer.timer_id}</span>
    </li>
  )
}

export default TimerItem