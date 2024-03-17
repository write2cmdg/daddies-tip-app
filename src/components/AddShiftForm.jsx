import { ClockIcon } from '@heroicons/react/24/outline'
impotrt React, { useState } from 'react'
import { Form, useFetcher } from 'react-router-dom'
import { useRef } from 'react'

const AddShiftForm = () => {
  const fetcher = useFetcher()
  const isSubmitting = fetcher.state === "submitting"

  const formRef = useRef()

  const [selected, setSelected] = useState()

useEffect(() => {
  if(!isSubmitting) {
    formRef.current.reset()
  }
}, [isSubmitting])
  return (
    <div className='form-wrapper'>
      <fetcher.Form method='post' className='grid-sm'>
        <div className="grid-xs">
          <label htmlFor="newShift" className='h2'>Start a new shift</label>
          <p>Select one:</p>
           <select
           value={selected}
           name='newShift' 
           id='newShift'
           onChange={e => setSelected(e.target.value) }>
              <option  key="Lunch" value="Lunch">Lunch</option>
              <option  key="Dinner" value="Dinner">Dinner</option>
              <option  key="Brunch" value="Brunch">Brunch</option>
              <option  key="Delivery" value="Delivery">Delivery</option>
           </select>
           <input type="hidden" name='_action' value="newShift" />
           <button type='submit' className='btn btn--dark' disabled={isSubmitting}>
            <span>Start Shift</span>
            <ClockIcon width={20} />
           </button>
        </div>
      </fetcher.Form>
    </div>
  )
}

export default AddShiftForm
