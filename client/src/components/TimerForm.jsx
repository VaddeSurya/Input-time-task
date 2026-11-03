import React, { useState } from 'react'

const TimerForm = ({ onSave, onInvalid }) => {
  const [time, setTime] = useState('')

  const handleSave = async () => {
    const countdown = parseInt(time, 10)
    if (isNaN(countdown) || countdown < 0) {
      onInvalid('Enter a number of seconds (0 or more).')
      return
    }
    const ok = await onSave(countdown)
    if (ok) setTime('')
  }

  return (
    <div className='flex gap-2'>
      <input
        type='number'
        min='0'
        value={time}
        onChange={(e) => setTime(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSave()}
        className='border-2 p-1'
        placeholder='enter time (seconds)'
      />
      <button
        onClick={handleSave}
        className='border-2 bg-blue-500 text-white rounded-[10px] p-1 px-3'
      >
        Save
      </button>
    </div>
  )
}

export default TimerForm