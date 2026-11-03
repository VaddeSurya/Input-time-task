import React from 'react'
import useTimers from './Usetimers'
import TimerForm from './components/TimerForm'
import TimerList from './components/TimerList'

const App = () => {
  const { timers, error, setError, addTimer } = useTimers()

  return (
    <div className='ml-44 mt-34'>
      <TimerForm onSave={addTimer} onInvalid={setError} />
      {error && <p className='text-red-600 mt-2'>{error}</p>}
      <TimerList timers={timers} />
    </div>
  )
}

export default App