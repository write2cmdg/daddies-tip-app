//library imports
import { ClockIcon } from '@heroicons/react/24/outline'

//react
import React, { useEffect, useState } from 'react'

//rrd
import { Form, useFetcher } from 'react-router-dom'



const AddShiftForm = () => {
  const fetcher = useFetcher()
  const isSubmitting = fetcher.state === "submitting"
  const [selected, setSelected] = useState()

  // useEffect(() => {
  //   if (!isSubmitting) {
  //   }
  // }, [isSubmitting])

  return (
    <div className='form-wrapper'>
      <fetcher.Form method='post' className='grid-sm'>
        <div className="grid-xs">
          <label htmlFor="newShift" className='h2'>Create Shift</label>
          <p>Select one:</p>
          <select
            value={selected}
            name='newShift'
            id='newShift'
            onChange={e => setSelected(e.target.value)}>
            <option key="Lunch" value="Lunch">Lunch</option>
            <option key="Dinner" value="Dinner">Dinner</option>
            <option key="Brunch" value="Brunch">Brunch</option>
            <option key="Delivery" value="Delivery">Delivery</option>
          </select>
          <input type="hidden" name='_action' value="newShift" />
          <button type='submit' className='btn btn--dark btn--width' disabled={isSubmitting}>
            {(isSubmitting) ? (
              <p>Processing...</p>
            ) : (
              <>
                <span>Create Shift</span>
                <ClockIcon width={20} />
              </>
            )}
          </button>
        </div>
      </fetcher.Form>
    </div>
  )
}

export default AddShiftForm
